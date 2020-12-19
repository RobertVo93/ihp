import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import CMActions from "redux/claimmanagers/actions";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

const { getTopCompanyUtilization } = CMActions;

const CMTopCompanyDashboard = props => {
  //Define states
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [hrefLinks, setHrefLinks] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  let history = useHistory();

  /**
   * ComponentDidMount
   */
  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    async function fetchData() {
      await props.getTopCompanyUtilization(props.authData);
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  /**
   * ComponentDidUpdate
   * Observe object: props.cmData.topCompanyUtilization
   */
  useEffect(() => {
    setIncData(props.cmData.topCompanyUtilization);
  }, [props.cmData.topCompanyUtilization]);

  /**
   * ComponentDidUpdate
   * Observe object: incomingData
   */
  useEffect(() => {
    if (incomingData == null || incomingData == 0) return;
    let labels = [];
    let data = [];
    let hrefLinks = [];
    //Convert data to chart's data
    for (var i = 0; i < incomingData.length; i++) {
      labels.push(
        incomingData[i].CompanyName.length > 20
          ? incomingData[i].CompanyName.substring(0, 20) + "..."
          : incomingData[i].CompanyName
      );
      data.push(incomingData[i].SClaims);
      hrefLinks.push(
        "/company/cmoverview/" + incomingData[i].CompanyID + "/overview"
      );
    }
    //config chart's data
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
    //Update states
    setHrefLinks(hrefLinks);
    setData(dataTemp);
  }, [incomingData]);

  return (
    <div>
      <div className="roe-card-style mt-15 mb-30 chart-loading-container">
        <ChartLoading
          isLoading={chartLoading}
          style={{ borderRadius: "6px" }}
        />
        <div className="roe-card-header">
          <div className="row header-container">
            <div className="float-left">
              <p className="card-main-header">Top Companies Utilization</p>
              <p className="card-sub-header">Overview of all time</p>
            </div>
            <div className="float-right">
              <a href="#" className="view-more-link">View more</a>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authData: {
      accessToken: state.auth.accessToken
    },
    cmData: {
      topCompanyUtilization: state.claimmanagers.topCompanyUtilization
    }
  };
};

export default connect(mapStateToProps, { getTopCompanyUtilization })(
  CMTopCompanyDashboard
);
