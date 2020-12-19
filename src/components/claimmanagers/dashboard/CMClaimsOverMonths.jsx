import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import CMActions from "redux/claimmanagers/actions";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";
import CustomRangeDatepickerWidget from "components/widgets/customdatepickerwidget/CustomRangeDatepickerWidget";

const { getVisitsByMonths } = CMActions;

const CMClaimsOverMonths = props => {
  //Define states
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [chartLoading, setChartLoading] = useState(false);
  //initial start-end date of range time
	const today = new Date();
	today.setDate(0);	//previous month
	const [startDate, setStartDate] = useState(today);
	const [endDate, setEndDate] = useState(new Date());

  /**
   * ComponentDidMount
   */
  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    async function fetchData() {
      await props.getVisitsByMonths(props.authData);
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  /**
   * ComponentDidUpdate
   * Observe object: props.cmData.visitsByMonths
   */
  useEffect(() => {
    setIncData(props.cmData.visitsByMonths);
  }, [props.cmData.visitsByMonths]);

  /**
   * ComponentDidUpdate
   * Observe object: IncomingData
   */
  useEffect(() => {
    if (incomingData == null || incomingData.length == 0) return;
    let labels = [];
    let data = [];
    let data2 = [];
    //Convert data to chart's data non-panel
    for (var i = 0; i < incomingData[0].length; i++) {
      labels.push(incomingData[0][i].VYear + "-" + incomingData[0][i].VMonth);
      data.push(incomingData[0][i].SClaims);
    }
    //Convert data to chart's data panel
    for (var i = 0; i < incomingData[1].length; i++) {
      data2.push(incomingData[1][i].SClaims);
    }
    //config chart's data
    const dataTemp = {
      labels: labels,
      datasets: [
        {
          label: "Sum of Non Panel Claims",
          backgroundColor: "#BB6BD9",
          hoverBackgroundColor: chroma("#BB6BD9")
            .alpha(0.8)
            .css(),
          data: data
        },
        {
          label: "Sum of Panel Claims",
          backgroundColor: "#2EB67D",
          hoverBackgroundColor: chroma("#2EB67D")
            .alpha(0.8)
            .css(),
          data: data2
        }
      ]
    };
    //Update states
    setData(dataTemp);
  }, [incomingData]);

  /**
   * Handle Select range time of datepicker
   * @param {*} start 
   * @param {*} end 
   */
  const onSelectRangeDatepickerHandler = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  }

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
              <p className="card-main-header">Non Panel Claims over Months</p>
              <p className="card-sub-header">Overview of all time</p>
            </div>
            <div className="float-right">
              <CustomRangeDatepickerWidget inline={false}
                initStart={startDate}
                initEnd={endDate}
                onSelectRange={onSelectRangeDatepickerHandler} />
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
      visitsByMonths: state.claimmanagers.visitsByMonths
    }
  };
};

export default connect(mapStateToProps, { getVisitsByMonths })(
  CMClaimsOverMonths
);
