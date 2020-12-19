import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import CompActions from "redux/company/actions";
import { useHistory } from "react-router-dom";
import CompanyTopEmployeeMCTable from "../tables/CompanyTopEmployeeMCTable";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

const { getCompanyTopEmployeeMC } = CompActions;

const CompanyOverviewTopMC = props => {
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [hrefLinks, setHrefLinks] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  let history = useHistory();

  /**
   * ComponentDidMount
   */
  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    async function fetchData() {
      await props.getCompanyTopEmployeeMC(
        props.authData,
        props.companyData.companyID
      );
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  /**
   * ComponentDidUpdate
   * Observe object: props.companyData.companyTopEmployeeMC
   */
  useEffect(() => {
    setIncData(props.companyData.companyTopEmployeeMC);
  }, [props.companyData.companyTopEmployeeMC]);

  /**
   * ComponentDidUpdate
   * Observe object: incomingData
   */
  useEffect(() => {
    if (incomingData == null || incomingData.length == 0) return;
    let labels = [];
    let data = [];
    let hrefLinks = [];
    let tData = [];
    for (var i = 0; i < incomingData.length; i++) {
      //add table data
      tData.push({
        no: i + 1,
        EmpName: incomingData[i].Name,
        SMC: incomingData[i].SMC
      });
      //only add top 5 data to chart
      if (i <= 5) {
        labels.push(
          incomingData[i].Name.length > 20
            ? incomingData[i].Name.substring(0, 20) + "..."
            : incomingData[i].Name
        );
        data.push(incomingData[i].SMC);
        hrefLinks.push("/patient/route/" + incomingData[i].NRIC + "/overview");
      }
    }
    //setup chart's information
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
                    <p className="card-main-header">Top Employees MC</p>
                    <p className="card-sub-header">Overview of all time</p>
                </div>
            </div>

          </div>
          {incomingData.length > 0 && (
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
                        userCallback: function (value, index, values) {
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
        <CompanyTopEmployeeMCTable tData={tableData} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authData: {
      accessToken: state.auth.accessToken
    },
    companyData: {
      companyID: state.company.viewingCompanyID,
      companyTopEmployeeMC: state.company.companyTopEmployeeMC
    }
  };
};

export default connect(mapStateToProps, { getCompanyTopEmployeeMC })(
  CompanyOverviewTopMC
);
