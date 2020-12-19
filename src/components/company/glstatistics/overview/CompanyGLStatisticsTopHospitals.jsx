import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import chroma from "chroma-js";
import { Bar } from "react-chartjs-2";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

import CompActions from "redux/company/actions";

const { getCompanyTopHospitalsForGL } = CompActions;

const color = chroma("#563c91");

const CompanyGLStatisticsTopHospitals = props => {
  //Define states
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [chartLoading, setChartLoading] = useState(false);

  /**
   * ComponentDidMount
   */
  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    async function fetchData() {
      await props.getCompanyTopHospitalsForGL(props.authData, props.companyData.companyID, props.GLType);
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIncData(props.companyData.topHospital);
  }, [props.companyData.topHospital]);

  /**
   * ComponentDidUpdate: watch on props.topHospital
   * Convert incomming data to chart data.
   */
  useEffect(() => {
    let labels = [];
    let dataBar = [];
    let dataLine = [];
    if (incomingData != null && incomingData.length > 0) {
      //Convert data to chart's data
      for (var i = 0; i < incomingData.length; i++) {
        if (i < 10) {
          labels.push(
            incomingData[i].HospName.length > 20
              ? incomingData[i].HospName.substring(0, 20) + "..."
              : incomingData[i].HospName
          );
          dataBar.push(incomingData[i].SumGLs);
          dataLine.push(incomingData[i].CountGLs);
        }
      }
    }
    //config chart's data
    const dataTemp = {
      labels: labels,
      datasets: [
        {
          label: "TNoG(Total Number of GL)",
          type: "line",
          data: dataLine,
          backgroundColor: "#ff0000",
          borderColor: "#ff0000",
          fill: false,
          hoverBackgroundColor: color.alpha(0.8).css(),
          order: 1,
          yAxisID: "right-y-axis"
        },
        {
          label: "TSoG(Total Sum of GL)",
          type: "bar",
          data: dataBar,
          backgroundColor: "#BB6BD9",
          hoverBackgroundColor: chroma("#BB6BD9")
            .alpha(0.8)
            .css(),
          order: 2,
          yAxisID: "left-y-axis"
        }
      ]
    };
    //Update states
    setData(dataTemp);
  }, [incomingData]);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="roe-card-style mt-15 mb-30 chart-loading-container">
          <ChartLoading
            isLoading={chartLoading}
            style={{ borderRadius: "6px" }}
          />
          <div className="roe-card-header">
            <div className="row header-container">
              <div className="float-left">
                <p className="card-main-header">{props.status} GL Top Hospitals</p>
                <p className="card-sub-header">Overview of all time</p>
              </div>
            </div>
          </div>
          <Bar
            data={data}
            height={100}
            options={{
              tooltips: {
                enabled: false,
                custom: customTooltip
              },
              legend: { display: true, position: "top" },
              onHover: (event, chartElement) => {
                event.target.style.cursor = chartElement[0]
                  ? "pointer"
                  : "default";
              },
              scales: {
                yAxes: [
                  {
                    id: "left-y-axis",
                    type: "linear",
                    position: "left",
                    scaleLabel: {
                      display: true,
                      labelString: "TSoG"
                    },
                    ticks: {
                      beginAtZero: true,
                      userCallback: function (value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(",");
                        return value;
                      }
                    }
                  },
                  {
                    id: "right-y-axis",
                    type: "linear",
                    position: "right",
                    scaleLabel: {
                      display: true,
                      labelString: "TNoG"
                    },
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
          />
        </div>
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
      topHospital: state.company.companyGLStatisticsTopHospitalsForGL
    }
  };
};

CompanyGLStatisticsTopHospitals.prototype = {
  GLType: PropTypes.string,
  status: PropTypes.string
}
export default connect(mapStateToProps, { getCompanyTopHospitalsForGL })(CompanyGLStatisticsTopHospitals);
