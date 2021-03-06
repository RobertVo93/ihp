import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import NewBar from "components/newchartswrapper/NewBar";
import CompActions from "redux/company/actions";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

const { getCompanyProductivityDemographics } = CompActions;

const CompanyProductivityDemographics = props => {
  //call apis
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState({ labels: "", datasets: [] });
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    async function fetchData() {
      await props.getCompanyProductivityDemographics(
        props.authData,
        props.companyData.companyID
      );
      //Hide chart loading after data load completed
      setChartLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIncData(props.companyData.demographics);
  }, [props.companyData.demographics]);

  useEffect(() => {
    let labels = [];
    let data = [];
    if (incomingData == null || incomingData.length == 0) return;
    for (var i = 0; i < Object.keys(incomingData[0]).length; i++) {
      labels.push(Object.keys(incomingData[0])[i]);
      data.push(
        incomingData[0][Object.keys(incomingData[0])[i]] == null
          ? 0
          : incomingData[0][Object.keys(incomingData[0])[i]]
      );
    }
    const dataTemp = {
      labels: labels,
      datasets: [
        {
          label: "MC Days",
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
                    <p className="card-main-header">Top MC Demographics</p>
                    <p className="card-sub-header">Overview of all time</p>
                </div>
            </div>
          </div>
          {incomingData != null && incomingData.length > 0 && (
            <NewBar
              data={data}
              height={400}
              options={{
                tooltips: {
                    enabled: false,
                    custom: customTooltip
                },
                maintainAspectRatio: false
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
      demographics: state.company.companyProductivityDemographics
    }
  };
};

export default connect(mapStateToProps, { getCompanyProductivityDemographics })(
  CompanyProductivityDemographics
);
