import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import AMActions from "redux/accountmanagers/actions";
import ChartLoading from "views/ChartLoading";
import { numberFormat } from "helper/numberFormat";
import customTooltip from "components/common/chartTooltip";


const { getLiveGrowth } = AMActions;

const AMDashboardLiveGrowth = props => {
  //call apis
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    async function fetchData() {
      await props.getLiveGrowth(props.authData);
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    //update the data
    if (
      props.amData.liveGrowthData == null ||
      props.amData.liveGrowthData.length == 0
    )
      return;
    let labels = [];
    let data = [];
    for (var i = 0; i < props.amData.liveGrowthData.length; i++) {
      labels.push(
        props.amData.liveGrowthData[i].YJoin +
        " - " +
        props.amData.liveGrowthData[i].MJoin
      );
      data.push(numberFormat(props.amData.liveGrowthData[i].ECount));
    }
    const dataTemp = {
      labels: labels,
      datasets: [
        {
          label: "Lives Growth",
          backgroundColor: "#BB6BD9",
          hoverBackgroundColor: chroma("#BB6BD9")
            .alpha(0.8)
            .css(),
          data: data
        }
      ]
    };
    setData(dataTemp);
  }, [props.amData.liveGrowthData]);
  return (
    <div>
      <div className="roe-card-style mt-15 mb-30 chart-loading-container">
        <ChartLoading
          isLoading={chartLoading}
          style={{ borderRadius: "6px" }}
        />
        <div className="roe-card-header">
          <span className="hash"> </span> <p>Growth of Lives over Months</p>
        </div>
        <NewBar
          data={data}
          height={400}
          options={{
            maintainAspectRatio: false,
            tooltips: {
              enabled: false,
              custom: customTooltip
            },
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
    amData: {
      liveGrowthData: state.accountmanagers.liveGrowthData
    }
  };
};

export default connect(mapStateToProps, { getLiveGrowth })(
  AMDashboardLiveGrowth
);
