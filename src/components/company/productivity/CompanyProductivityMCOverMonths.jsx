import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import CompActions from "redux/company/actions";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";
import CustomRangeDatepickerWidget from "components/widgets/customdatepickerwidget/CustomRangeDatepickerWidget";

const { getCompanyProductivityMCOverMonths } = CompActions;

const CompanyProductivityMCOverMonths = props => {
  //call apis
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [chartLoading, setChartLoading] = useState(false);
  //initial start-end date of range time
	const today = new Date();
	today.setDate(0);	//previous month
	const [startDate, setStartDate] = useState(today);
	const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    async function fetchData() {
      await props.getCompanyProductivityMCOverMonths(
        props.authData,
        props.companyData.companyID
      );
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIncData(props.companyData.MCByMonths);
  }, [props.companyData.MCByMonths]);

  useEffect(() => {
    let labels = [];
    let data = [];
    if (incomingData == null || incomingData.length == 0) return;
    for (var i = 0; i < incomingData[0].length; i++) {
      labels.push(incomingData[0][i].YVisit + "-" + incomingData[0][i].MVisit);
      data.push(incomingData[0][i].SMC);
    }
    const dataTemp = {
      labels: labels,
      datasets: [
        {
          label: "Sum of MC",
          backgroundColor: "#BB6BD9",
          hoverBackgroundColor: chroma("#BB6BD9")
            .alpha(0.8)
            .css(),
          data: data
        }
      ]
    };
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
              <p className="card-main-header">MC Days over Months</p>
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
        )}
        {(incomingData == null || incomingData.length == 0) && !chartLoading && (
          <div style={{ marginLeft: "23px", marginBottom: "15px" }}>
            <p>This chart contains no data</p>
          </div>
        )}
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
      MCByMonths: state.company.companyProductivityMCOverMonths
    }
  };
};

export default connect(mapStateToProps, { getCompanyProductivityMCOverMonths })(
  CompanyProductivityMCOverMonths
);
