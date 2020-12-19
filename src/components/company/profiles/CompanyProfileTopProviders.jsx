import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import CompActions from "redux/company/actions";
import CompanyProfileTopProvidersTable from "./CompanyProfileTopProvidersTable";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

const {
  getCompanyInpatientProfileTopProviders,
  getCompanyOutpatientProfileTopProviders
} = CompActions;

const CompanyProfileTopProviders = props => {
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
        await props.getCompanyInpatientProfileTopProviders(
          props.authData,
          props.companyData.companyID
        );
      } else if (props.statMode == "Outpatient GP") {
        await props.getCompanyOutpatientProfileTopProviders(
          props.authData,
          props.companyData.companyID,
          "GP"
        );
      } else if (props.statMode == "Outpatient SP") {
        await props.getCompanyOutpatientProfileTopProviders(
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
    setIncData(props.companyData.topProviders);
  }, [props.companyData.topProviders]);

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
        ClinicName: incomingData[i].ClinicName,
        SClaims: incomingData[i].SClaims,
        AClaims: incomingData[i].AClaims,
        SCount: incomingData[i].SCount,
        TotalHeadcount:
          incomingData[i].Employee +
          incomingData[i].Spouse +
          incomingData[i].Child,
        Employee: incomingData[i].Employee,
        Spouse: incomingData[i].Spouse,
        Child: incomingData[i].Child
      });
      if (i <= 5) {
        labels.push(
          incomingData[i].ClinicName.length > 20
            ? incomingData[i].ClinicName.substring(0, 20) + "..."
            : incomingData[i].ClinicName
        );
        data.push(incomingData[i].SClaims);
        hrefLinks.push(
          "/clinic/route/" + incomingData[i].ClinicName + "/overview"
        );
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
                    <p className="card-main-header">Top Providers</p>
                    <p className="card-sub-header">Overview of all time</p>
                </div>
                <div>
                    <div className="bar bar-row">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="bar bar-column bar-active">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
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
                    <p className="card-main-header">Top Providers (Table)</p>
                    <p className="card-sub-header">Overview of all time</p>
                </div>
            </div>
          </div>
          {(incomingData != null && incomingData.length) > 0 && (
            <CompanyProfileTopProvidersTable tData={tableData} />
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
      topProviders: state.company.companyProfileTopProviders
    }
  };
};

export default connect(mapStateToProps, {
  getCompanyInpatientProfileTopProviders,
  getCompanyOutpatientProfileTopProviders
})(CompanyProfileTopProviders);
