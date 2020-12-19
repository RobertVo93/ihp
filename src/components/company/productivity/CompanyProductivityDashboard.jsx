import React, { useState, useEffect } from "react";
import { getEmployeeHeadcount } from "util/constant_methods";
import { connect } from "react-redux";
import CompActions from "redux/company/actions";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import MiniWidgetV1 from "components/widgets/statisticswidgets/miniwidget/MiniWidgetV1";
import { totalPanelClaimantsBg } from "helper/constant";
import { totalPanelClaimantsIcon } from "helper/constant";
import { totalPanelClaimValueBg } from "helper/constant";
import { totalPanelClaimValueIcon } from "helper/constant";
import { totalPanelClaimsBg } from "helper/constant";
import { totalPanelClaimsIcon } from "helper/constant";
import ChartLoading from "views/ChartLoading";
const { getCompanyProductivityDashboard, getCompanyHeadcount } = CompActions;

const CompanyProductivityDashboard = props => {
  //call apis
  const [TLD, setTLD] = useState([]);
  const [TLD2, setTLD2] = useState([]);
  const [totalMCCount, setTotalMCCount] = useState(0);
  const [avgMCCount, setAvgMCCount] = useState(0);
  const [avg2MCCount, setAvg2MCCount] = useState(0);
  const [statType, setStatType] = useState("Panel");
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    let p1 = props.getCompanyProductivityDashboard(
      props.authData,
      props.companyData.companyID
    );
    let p2 = props.getCompanyHeadcount(props.authData, props.companyData.companyID);
    Promise.all([p1, p2]).then(val => {
      setChartLoading(false);
    });
  }, []);

  useEffect(() => {
    setTLD(props.companyData.topDashboard);
  }, [props.companyData.topDashboard]);

  useEffect(() => {
    setTLD2(props.companyData.headcount);
  }, [props.companyData.headcount]);

  useEffect(() => {
    //update the data
    if (TLD == null || TLD.length == 0) return;
    setTotalMCCount(TLD[0].SMC == null ? 0 : TLD[0].SMC);
    setAvgMCCount(TLD[0].AMC == null ? 0 : TLD[0].AMC);
    if (TLD2 == null || TLD2.length == 0) return;
    setAvg2MCCount(
      TLD[0].SMC == null ? 0 : TLD[0].SMC / getEmployeeHeadcount(TLD2[1])
    );
  }, [TLD]);

  useEffect(() => {
    //update the data
    if (TLD == null || TLD.length == 0) return;
    if (TLD2 == null || TLD2.length == 0) return;
    setAvg2MCCount(
      TLD[0].SMC == null ? 0 : TLD[0].SMC / getEmployeeHeadcount(TLD2[1])
    );
  }, [TLD2]);

  return (
    <div>
      <div className="roe-card-style mt-15 mb-30 chart-loading-container">
        <ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
        <div className="roe-card-header">
          <div className="row header-container" style={{ marginLeft: "0px" }}>
            <div className="float-left">
              <p className="card-main-header">Company Productivity Statistics</p>
              <p className="card-sub-header">Overview of all time</p>
            </div>
          </div>
        </div>
        <div className="row mlr-0 mini-widget-container">
          <div className="col-12 col-xl-4 col-md-12 ptb-15">
            <MiniWidgetV1
              iconSource={totalPanelClaimsIcon}
              background={totalPanelClaimsBg}
              className="demo"
              headline={numberFormat(totalMCCount)}
              subheader={"Total " + statType + " MC Days"}
            />
          </div>

          <div className="col-12 col-xl-4 col-md-12 ptb-15">
            <MiniWidgetV1
              iconSource={totalPanelClaimValueIcon}
              background={totalPanelClaimValueBg}
              className="demo"
              headline={moneyFormat(avgMCCount)}
              subheader={"Avg " + statType + " MC Days"}
            />
          </div>
          <div className="col-12 col-xl-4 col-md-12 ptb-15">
            <MiniWidgetV1
              iconSource={totalPanelClaimantsIcon}
              background={totalPanelClaimantsBg}
              className="demo"
              headline={moneyFormat(avg2MCCount)}
              subheader={"Avg " + statType + " MC Days Per Employee"}
            />
          </div>
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
      topDashboard: state.company.companyProductivityDashboard,
      headcount: state.company.companyHeadcount
    }
  };
};

export default connect(mapStateToProps, {
  getCompanyProductivityDashboard,
  getCompanyHeadcount
})(CompanyProductivityDashboard);
