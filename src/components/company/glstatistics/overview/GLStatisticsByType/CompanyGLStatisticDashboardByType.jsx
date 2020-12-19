import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CompActions from "redux/company/actions";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import MiniWidgetV1 from "components/widgets/statisticswidgets/miniwidget/MiniWidgetV1";
import { avgPanelClaimValueIcon, avgPanelClaimValueBg, totalPanelClaimsIcon, totalPanelClaimsBg, totalPanelClaimantsIcon, totalPanelClaimantsBg } from "helper/constant";
import ChartLoading from "views/ChartLoading";
const { getCompanyGLDashboardByType } = CompActions;

const CompanyGLStatisticDashboardByType = props => {
	const [totalGuarantee, setTotalGuarantee] = useState(0);
	const [totalValueGuarantee, setTotalValueGuarantee] = useState(0);
	const [totalUniqueClaimants, setTotalUniqueClaimants] = useState(0);
	const [chartLoading, setChartLoading] = useState(false);

	useEffect(() => {
		//show chart loading
		setChartLoading(true);
		async function fetchData() {
			//Get Company GL statistic Dashboard
		  await props.getCompanyGLDashboardByType(props.authData, props.companyData.companyID, props.GLType);
		  //Hide chart loading after data load completed
		  setChartLoading(false);
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (props.companyData.topDashboard && props.companyData.topDashboard.length === 1) {
			//Update No GLs, Value of GLs, unique Claimants
			setTotalGuarantee(props.companyData.topDashboard[0].CountGLs);
			setTotalValueGuarantee(props.companyData.topDashboard[0].SumGLs);
			setTotalUniqueClaimants(props.companyData.topDashboard[0].CountClaimants);
		}
	}, [props.companyData.topDashboard]);

	return (
		<div>
			<div className="roe-card-style mt-15 mb-30 chart-loading-container">
				<ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
				<div className="roe-card-header">
					<div className="row header-container" style={{ marginLeft: "0px" }}>
						<div className="float-left">
							<p className="card-main-header">{props.status} GL Statistics</p>
							<p className="card-sub-header">Overview of all time</p>
						</div>
					</div>
				</div>
				<div className="row mlr-0 mini-widget-container">
					<div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
						<MiniWidgetV1
							iconSource={totalPanelClaimsIcon}
							background={totalPanelClaimsBg}
							className="demo"
							headline={numberFormat(totalGuarantee)}
							subheader="Total Number of Guarantee Letters"
						/>
					</div>
					<div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
						<MiniWidgetV1
							iconSource={avgPanelClaimValueIcon}
							background={avgPanelClaimValueBg}
							className="demo"
							headline={"$" + moneyFormat(totalValueGuarantee)}
							subheader="Total Value of Guarantee Letters"
						/>
					</div>
					<div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 ptb-15">
						<MiniWidgetV1
							iconSource={totalPanelClaimantsIcon}
							background={totalPanelClaimantsBg}
							className="demo"
							headline={numberFormat(totalUniqueClaimants)}
							subheader="Total Unique Claimants"
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
			topDashboard: state.company.companyGLStatisticsDashboardByType
		}
	};
};

CompanyGLStatisticDashboardByType.prototype = {
	GLType: PropTypes.string,
	status: PropTypes.string
}

export default connect(mapStateToProps, { getCompanyGLDashboardByType })(
	CompanyGLStatisticDashboardByType
);
