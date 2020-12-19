import React, { useState, useEffect } from "react";
import { getEmployeeHeadcount } from "util/constant_methods";
import { connect } from "react-redux";
import { MiniWidgetV1 } from "components/widgets/statisticswidgets";
import CompActions from "redux/company/actions";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import { totalPanelClaimsIcon } from "helper/constant";
import { totalPanelClaimsBg } from "helper/constant";
import { totalPanelClaimValueIcon } from "helper/constant";
import { totalPanelClaimantsIcon } from "helper/constant";
import { avgPanelClaimValueIcon } from "helper/constant";
import { avgPanelClaimValueBg } from "helper/constant";
import { avgPanelClaimsVisit } from "helper/constant";
import { totalPanelClaimsBg2 } from "helper/constant";
import ChartLoading from "views/ChartLoading";
const {
  getCompanyInpatientProfileDashboard,
  getCompanyOutpatientProfileDashboard,
  getCompanyHeadcount
} = CompActions;

const CompanyProfileDashboard = props => {
  //call apis
  const [TLD, setTLD] = useState([]);
  const [TLD2, setTLD2] = useState([]);
  const [totalVisitCount, setTotalVisitCount] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [avgClaims, setAvgClaims] = useState(0);
  const [avgClaims2, setAvgClaims2] = useState(0);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    //show chart loading
    setChartLoading(true);
    let p1, p2;
    if (props.statMode == "Inpatient") {
      p1 = props.getCompanyInpatientProfileDashboard(
        props.authData,
        props.companyData.companyID
      );
    } else if (props.statMode == "Outpatient GP") {
      p1 = props.getCompanyOutpatientProfileDashboard(
        props.authData,
        props.companyData.companyID,
        "GP"
      );
    } else if (props.statMode == "Outpatient SP") {
      p1 = props.getCompanyOutpatientProfileDashboard(
        props.authData,
        props.companyData.companyID,
        "SP"
      );
    }
    p2 = props.getCompanyHeadcount(props.authData, props.companyData.companyID);
    Promise.all([p1, p2]).then(val => {
      setChartLoading(false);
    });
  }, [props.statMode]);

  useEffect(() => {
    setTLD(props.companyData.topDashboard);
  }, [props.companyData.topDashboard]);

  useEffect(() => {
    setTLD2(props.companyData.headcount);
  }, [props.companyData.headcount]);

  useEffect(() => {
    //update the data
    if (TLD == null || TLD.length == 0) return;
    setTotalVisitCount(
      TLD[0].SCount == null ? 0 : numberFormat(TLD[0].SCount)
    );
    setTotalClaims(
      TLD[0].SClaims == null ? "$0" : "$" + moneyFormat(TLD[0].SClaims)
    );
    setAvgClaims(
      TLD[0].AClaims == null ? "$0" : "$" + moneyFormat(TLD[0].AClaims)
    );
    if (TLD2 == null || TLD2.length == 0) return;
    setAvgClaims2(
      TLD[0].SClaims == null
        ? "$0"
        : "$" + moneyFormat(TLD[0].SClaims / getEmployeeHeadcount(TLD2[1]))
    );
  }, [TLD]);

  useEffect(() => {
    //update the data
    if (TLD == null || TLD.length == 0) return;
    if (TLD2 == null || TLD2.length == 0) return;
    setAvgClaims2(
      TLD[0].SClaims == null
        ? 0
        : "$" + moneyFormat(TLD[0].SClaims / getEmployeeHeadcount(TLD2[1]))
    );
  }, [TLD2]);

  return (
    <div>
      <div className="roe-card-style mt-15 mb-30 chart-loading-container">
        <ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
        <div className="roe-card-header">
          <div className="row" style={{ marginLeft: "0px" }}>
            <div className="row header-container">
              <div className="float-left">
                <p className="card-main-header">{"Company " + props.statMode + " Profile Statistics"}</p>
                <p className="card-sub-header">Overview of all time</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mlr-0 mini-widget-container">
          <div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
            <MiniWidgetV1
              iconSource={totalPanelClaimsIcon}
              background={totalPanelClaimsBg}
              className="demo"
              headline={totalVisitCount}
              subheader={"Total Visit Count"}
            />
          </div>

          <div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
            <MiniWidgetV1
              iconSource={totalPanelClaimValueIcon}
              background={totalPanelClaimsBg2}
              className="demo"
              headline={totalClaims}
              subheader={"Total Claims"}
            />
          </div>
          <div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
            <MiniWidgetV1
              iconSource={totalPanelClaimantsIcon}
              background={avgPanelClaimsVisit}
              className="demo"
              headline={avgClaims}
              subheader={"Avg Claims per Visit"}
            />
          </div>
          <div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
            <MiniWidgetV1
              iconSource={avgPanelClaimValueIcon}
              background={avgPanelClaimValueBg}
              className="demo"
              headline={avgClaims2}
              subheader={"Avg Claims per Employee"}
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
      topDashboard: state.company.companyProfileDashboard,
      headcount: state.company.companyHeadcount
    }
  };
};

export default connect(mapStateToProps, {
  getCompanyInpatientProfileDashboard,
  getCompanyOutpatientProfileDashboard,
  getCompanyHeadcount
})(CompanyProfileDashboard);
