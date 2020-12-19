import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import chroma from "chroma-js";
import { Bar } from "react-chartjs-2";
import CMActions from "redux/claimmanagers/actions";
import { useHistory } from "react-router-dom";
import CMTopProvidersTable from "../tables/CMTopProvidersTable";
import ChartLoading from "views/ChartLoading";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import customTooltip from "components/common/chartTooltip";

const { getCMAllProviders } = CMActions;
const color = chroma("#563c91");

const CMTopProviders = props => {
  //Define states
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [dataTable, setDataTable] = useState([]);
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
      await props.getCMAllProviders(props.authData);
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  /**
   * ComponentDidUpdate
   * Observe object: props.cmData.topProviders
   */
  useEffect(() => {
    setIncData(props.cmData.topProviders);
  }, [props.cmData.topProviders]);

  /**
   * ComponentDidUpdate
   * Observe object: IncomingData
   */
  useEffect(() => {
    if (incomingData == null || incomingData.length == 0) return;
    let labels = [];
    let dataBar = [];
    let dataLine = [];
    let tData = [];
    let hrefLinks = [];
    //Convert data to chart's data
    for (var i = 0; i < incomingData.length; i++) {
      if (i < 10) {
        //avoid incomingData[i].ClinicName is null
        if (incomingData[i].ClinicName == null) continue;
        labels.push(
          incomingData[i].ClinicName.length > 20
            ? incomingData[i].ClinicName.substring(0, 20) + "..."
            : incomingData[i].ClinicName
        );
        dataBar.push(incomingData[i].SClaims);
        dataLine.push(incomingData[i].AClaims);
        hrefLinks.push(
          "/clinic/route/" + incomingData[i].ClinicName + "/overview"
        );
      }
      tData.push({
        no: i + 1,
        Provider: incomingData[i].ClinicName,
        Count: numberFormat(incomingData[i].Count),
        AClaims: moneyFormat(incomingData[i].AClaims),
        SClaims: moneyFormat(incomingData[i].SClaims)
      });
    }
    //config chart's data
    const dataTemp = {
      labels: labels,
      datasets: [
        {
          label: "ABS(Average Bill Size)",
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
          label: "SOB(Sum of Bills)",
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
    setHrefLinks(hrefLinks);
    setData(dataTemp);
    setDataTable(tData);
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
            <span className="hash"> </span> <p>Top Providers</p>
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
                      labelString: "SOB"
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
                      labelString: "ABS"
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
            onElementsClick={elems => {
              if (hrefLinks[elems[0]?._index]) {
                history.push(hrefLinks[elems[0]._index]);
              }
            }}
          />
          <div className="mb-30"></div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="roe-card-style mt-15 mb-30">
          <div className="roe-card-header">
            <span className="hash"> </span> <p>Top Providers (Table)</p>
          </div>
          <CMTopProvidersTable tableData={dataTable} />
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
    cmData: {
      topProviders: state.claimmanagers.topProviders[0]
    }
  };
};

export default connect(mapStateToProps, { getCMAllProviders })(CMTopProviders);
