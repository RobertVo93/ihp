import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import CompActions from "redux/company/actions";
import CompanyProfileTopEmployeesTable from "./CompanyProfileTopEmployeesTable";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import customTooltip from "components/common/chartTooltip";

const {
  getCompanyInpatientProfileTopEmployees,
  getCompanyOutpatientProfileTopEmployees
} = CompActions;

const CompanyProfileTopEmployees = props => {
  //call apis
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [hrefLinks, setHrefLinks] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    async function fetchData() {
      if (props.statMode == "Inpatient") {
        await props.getCompanyInpatientProfileTopEmployees(
          props.authData,
          props.companyData.companyID
        );
      } else if (props.statMode == "Outpatient GP") {
        await props.getCompanyOutpatientProfileTopEmployees(
          props.authData,
          props.companyData.companyID,
          "GP"
        );
      } else if (props.statMode == "Outpatient SP") {
        await props.getCompanyOutpatientProfileTopEmployees(
          props.authData,
          props.companyData.companyID,
          "SP"
        );
      }
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIncData(props.companyData.topEmployees);
  }, [props.companyData.topEmployees]);

  useEffect(() => {
    //alert("haha");
    let labels = [];
    let data = [];
    let hrefLinks = [];
    let tData = [];
    if (incomingData == null || incomingData.length == 0) return;
    for (var i = 0; i < incomingData.length; i++) {
      tData.push({
        no: i + 1,
        Name: incomingData[i].Name,
        NRIC: incomingData[i].NRIC,
        SClaims: moneyFormat(incomingData[i].SClaims),
        AClaims: moneyFormat(incomingData[i].AClaims),
        SCount: numberFormat(incomingData[i].SCount),
        SchemeID: incomingData[i].SchemeID,
        Relation: incomingData[i].Relation
      });
      if (i <= 5) {
        labels.push(
          incomingData[i].Name.length > 20
            ? incomingData[i].Name.substring(0, 20) + "..."
            : incomingData[i].Name
        );
        data.push(incomingData[i].SClaims);
        hrefLinks.push("/patient/route/" + incomingData[i].NRIC + "/overview");
      }
    }
    const dataTemp = {
      labels: labels,
      datasets: [
        {
          label: "Utilization Sum",
          backgroundColor: "#BB6BD9",
          hoverBackgroundColor: chroma("#BB6BD9")
            .alpha(0.8)
            .css(),
          data: data
        }
      ]
    };
    setHrefLinks(hrefLinks);
    setData(dataTemp);
    setTableData(tData);
  }, [incomingData]);

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="roe-card-style mt-15 mb-30 chart-loading-container">
          <ChartLoading
            isLoading={chartLoading}
            style={{ borderRadius: "6px" }}
          />
          <div className="roe-card-header">
            <div className="row header-container">
                <div className="float-left">
                    <p className="card-main-header">Top Employees</p>
                    <p className="card-sub-header">Overview of all time</p>
                </div>
            </div>
          </div>
          {(incomingData != null && incomingData.length) > 0 && (
            <NewBar
              data={data}
              height={400}
              options={{
                tooltips: {
                    enabled: false,
                    custom: customTooltip
                },
                maintainAspectRatio: false,
                onHover: (event, chartElement) => {
                  event.target.style.cursor = chartElement[0]
                    ? "pointer"
                    : "default";
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                          value = value.toString();
                          value = value.split(/(?=(?:...)*$)/);
                          value = value.join(",");
                          return value;
                        }
                      }
                    }
                  ]
                }
              }}
              onElementsClick={elems => {
                if (hrefLinks[elems[0]?._index]) {
                  history.push(hrefLinks[elems[0]._index]);
                }
              }}
            />
          )}
          {(incomingData == null || incomingData.length == 0) && !chartLoading && (
            <div style={{ marginLeft: "23px", marginBottom: "15px" }}>
              <p>This chart contains no data</p>
            </div>
          )}
        </div>
      </div>
      <div className="col-lg-6">
        <div className="roe-card-style mt-15 mb-30">
          <div className="roe-card-header">
            <div className="row header-container">
                <div className="float-left">
                    <p className="card-main-header">Top Employees (Table)</p>
                    <p className="card-sub-header">Overview of all time</p>
                </div>
            </div>
          </div>
          {(incomingData != null && incomingData.length) > 0 && (
            <CompanyProfileTopEmployeesTable tData={tableData} />
          )}
          {(incomingData == null || incomingData.length == 0) && (
            <div style={{ marginLeft: "23px", marginBottom: "15px" }}>
              <p>This chart contains no data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterComponent = tableInstance => {
  const { filterValue, setFilter } = tableInstance.column;
  return (
    <input
      type="text"
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      className="tabl-search react-form-input"
      placeholder={`Search ${tableInstance.column.placeholder}`}
      onClick={e => e.stopPropagation()}
    />
  );
};

const mapStateToProps = state => {
  return {
    authData: {
      accessToken: state.auth.accessToken
    },
    companyData: {
      companyID: state.company.viewingCompanyID,
      topEmployees: state.company.companyProfileTopEmployees
    }
  };
};

export default connect(mapStateToProps, {
  getCompanyInpatientProfileTopEmployees,
  getCompanyOutpatientProfileTopEmployees
})(CompanyProfileTopEmployees);
