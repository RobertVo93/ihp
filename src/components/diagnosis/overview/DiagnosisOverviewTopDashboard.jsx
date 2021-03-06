import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { SWITCH_ORDER } from "util/data/switchorder";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import DiagnosisActions from "redux/diagnosis/actions";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import MiniWidgetV1 from "components/widgets/statisticswidgets/miniwidget/MiniWidgetV1";
import ChartLoading from "views/ChartLoading";
import {
	totalPanelClaimsIcon,
	totalPanelClaimValueIcon,
	avgPanelClaimValueIcon,
	totalPanelClaimantsIcon,
	totalPanelClaimsBg,
	totalPanelClaimValueBg,
	avgPanelClaimValueBg,
	totalPanelClaimantsBg
} from "helper/constant";
const { getDashboard } = DiagnosisActions;

const DiagnosisOverviewTopDashboard = props => {
	//call apis
	const [TLD, setTLD] = useState([]);
	const [totalNPClaimsCount, setTotalNPClaimsCount] = useState(0);
	const [totalNPClaims, setTotalNPClaims] = useState(0);
	const [totalNPClaimants, setNPClaimants] = useState(0);
	const [avgNPClaims, setAvgNPClaims] = useState(0);
	const [statType, setStatType] = useState("Panel");
	const [chartLoading, setChartLoading] = useState(false);

	useEffect(() => {
		//show chart loading
		setChartLoading(true);
		async function fetchData() {
		  await props.getDashboard(props.authData, props.diagnosisData.diagnosisID);
		  //Hide chart loading after data load completed
		  setChartLoading(false);
		}
		fetchData();
	}, []);

	useEffect(() => {
		setTLD(props.diagnosisData.topDashboard);
	}, [props.diagnosisData.topDashboard]);

	useEffect(() => {
		//update the data
		if (TLD.length == 0) return;
		//determine if its panel / non panel
		let queryIndex = 0;
		if (TLD[1].length != 0 && TLD[1][0].SClaims != null) {
			setStatType("Panel");
			queryIndex = SWITCH_ORDER["Panel"];
		} else if (TLD[0].length != 0 && TLD[0][0].SClaims != null) {
			setStatType("Non Panel");
			queryIndex = SWITCH_ORDER["Non Panel"];
		} else {
			setStatType("GHS");
			queryIndex = SWITCH_ORDER["GHS"];
		}

		setTotalNPClaimsCount(TLD[queryIndex][0].SCount);
		setTotalNPClaims(
			TLD[queryIndex][0].SClaims == null ? 0 : TLD[queryIndex][0].SClaims
		);
		setNPClaimants(TLD[queryIndex][0].UniqueCount);
		setAvgNPClaims(
			TLD[queryIndex][0].AClaims == null ? 0 : TLD[queryIndex][0].AClaims
		);
	}, [TLD]);

	let SwitchStatistics = type => {
		let queryIndex = 0;
		setStatType(type);
		queryIndex = SWITCH_ORDER[type];

		setTotalNPClaimsCount(TLD[queryIndex][0].SCount);
		setTotalNPClaims(
			TLD[queryIndex][0].SClaims == null ? 0 : TLD[queryIndex][0].SClaims
		);
		setNPClaimants(TLD[queryIndex][0].UniqueCount);
		setAvgNPClaims(
			TLD[queryIndex][0].AClaims == null ? 0 : TLD[queryIndex][0].AClaims
		);
	};

	return (
		<div>
			<div className="roe-card-style mt-15 mb-30 chart-loading-container">
				<ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
				<div className="roe-card-header">
					<div className="row header-container">
						<div className="float-left">
							<p className="card-main-header">Diagnosis Statistics</p>
							<p className="card-sub-header">Overview of all time</p>
						</div>
						<div className="float-right">
							<Button
								onClick={() => SwitchStatistics("Panel")}
								disabled={statType == "Panel"}
								className={classNames("ml-10", statType == "Panel" ? "c-dark" : "btn-light")}
								size="sm"
							>
								Panel
              				</Button>
							<Button
								onClick={() => SwitchStatistics("Non Panel")}
								disabled={statType == "Non Panel"}
								className={classNames("ml-10", statType == "Non Panel" ? "c-dark" : "btn-light")}
								size="sm"
							>
								Non-Panel
              				</Button>
							<Button
								onClick={() => SwitchStatistics("GHS")}
								disabled={statType == "GHS"}
								className={classNames("ml-10", statType == "GHS" ? "c-dark" : "btn-light")}
								size="sm"
							>
								GHS
              				</Button>
						</div>
					</div>
				</div>

				<div className="row mlr-0 mini-widget-container">
					<div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
						<MiniWidgetV1
							iconSource={totalPanelClaimsIcon}
							background={totalPanelClaimsBg}
							className="demo"
							headline={numberFormat(totalNPClaimsCount)}
							subheader={"Total " + statType + " Claims"}
						/>
					</div>
					<div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
						<MiniWidgetV1
							iconSource={totalPanelClaimValueIcon}
							background={totalPanelClaimValueBg}
							className="demo"
							headline={"$" + moneyFormat(totalNPClaims)}
							subheader={"Total " + statType + " Claim Value"}
						/>
					</div>
					<div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
						<MiniWidgetV1
							iconSource={totalPanelClaimantsIcon}
							background={totalPanelClaimantsBg}
							className="demo"
							headline={numberFormat(totalNPClaimants)}
							subheader={"Total " + statType + " Claimants"}
						/>
					</div>
					<div className="col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6 ptb-15">
						<MiniWidgetV1
							iconSource={avgPanelClaimValueIcon}
							background={avgPanelClaimValueBg}
							className="demo"
							headline={"$" + moneyFormat(avgNPClaims)}
							subheader={"Avg " + statType + " Claim Value"}
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
		diagnosisData: {
			diagnosisID: state.diagnosis.viewingDiagnosisID,
			topDashboard: state.diagnosis.diagnosisTopDashboard
		}
	};
};

export default connect(mapStateToProps, { getDashboard })(
	DiagnosisOverviewTopDashboard
);
