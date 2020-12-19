import React, { useState, useEffect } from "react";
import classNames from "classnames";
import chroma from "chroma-js";
import { SWITCH_ORDER } from "util/data/switchorder";
import { convertEmployeeType } from "util/constant_methods";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PatActions from "redux/patient/actions";
import PatientWidget from "./PatientWidget";
import PatientStatsWidget from "./PatientStatsWidget";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import ChartLoading from "views/ChartLoading";
import MiniWidgetV1 from "components/widgets/statisticswidgets/miniwidget/MiniWidgetV1";
import {
	totalPanelClaimsIcon,
	totalPanelClaimValueIcon,
	avgPanelClaimValueIcon,
	totalPanelClaimsBg,
	totalPanelClaimValueBg,
	avgPanelClaimValueBg
} from "helper/constant";
const { getDashboard } = PatActions;

const PatientOverviewTopDashboard = props => {
	//call apis
	const [TLD, setTLD] = useState([]);
	const [totalNPClaimsCount, setTotalNPClaimsCount] = useState(0);
	const [totalNPClaims, setTotalNPClaims] = useState(0);
	const [totalNPClaimants, setNPClaimants] = useState(0);
	const [avgNPClaims, setAvgNPClaims] = useState(0);
	const [statType, setStatType] = useState("Panel");
	const [pieChartData, setPCD] = useState({});
	const [statsData, setSD] = useState({});
	const [chartLoading, setChartLoading] = useState(false);

	useEffect(() => {
		//show chart loading
		setChartLoading(true);
		async function fetchData() {
			await props.getDashboard(props.authData, props.patientData.patientID);
			//Hide chart loading after data load completed
			setChartLoading(false);
		}
		fetchData();
	}, []);

	useEffect(() => {
		setTLD(props.patientData.topDashboard);
	}, [props.patientData.topDashboard]);

	useEffect(() => {
		//update the data
		if (TLD == null || TLD.length == 0) return;
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

		//set PieChartData & stats data
		let statsData = {};
		statsData.ghsAmount = TLD[2][0].SClaims == null ? 0 : TLD[2][0].SClaims;
		statsData.npAmount = TLD[1][0].SClaims == null ? 0 : TLD[1][0].SClaims;
		statsData.panelAmount = TLD[0][0].SClaims == null ? 0 : TLD[0][0].SClaims;
		statsData.visitCount =
			(TLD[2][0].SCount == null ? 0 : TLD[2][0].SCount) +
			(TLD[1][0].SCount == null ? 0 : TLD[1][0].SCount) +
			(TLD[0][0].SCount == null ? 0 : TLD[0][0].SCount);
		let totalAmount =
			statsData.ghsAmount + statsData.npAmount + statsData.panelAmount;
		statsData.ghsPercentage =
			((statsData.ghsAmount / totalAmount) * 100).toLocaleString() + "%";
		statsData.npPercentage =
			((statsData.npAmount / totalAmount) * 100).toLocaleString() + "%";
		statsData.panelPercentage =
			((statsData.panelAmount / totalAmount) * 100).toLocaleString() + "%";
		setSD(statsData);

		let labels = ["GHS", "Non Panel", "Panel"];
		let data = [statsData.ghsAmount, statsData.npAmount, statsData.panelAmount];

		const dataTemp = {
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: ["#5073B8", "#FF0000", "#FFE600"],
					hoverBackgroundColor: [
						chroma("#5073B8").alpha(0.8).css(),
						chroma("#FF0000").alpha(0.8).css(),
						chroma("#FFE600").alpha(0.8).css()
					]
				}
			]
		};
		setPCD(dataTemp);
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
			{TLD != null && TLD.length > 0 && (
				<div className="row">
					<div className="col-lg-6 col-sm-12 profile-widget-res mb-15">
						<PatientWidget
							name={TLD[3][0].Name}
							empType={convertEmployeeType(TLD[3][0].Relation)}
							age={TLD[3][0].Age}
							companyName={TLD[3][0].CompanyName}
							gender={TLD[3][0].Gender}
						/>
					</div>
					{pieChartData != null && (
						<div className="col-lg-6 col-sm-12 profile-widget-res chart-loading-container  mb-15">
							<ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px', width: 'calc(100% - 30px)' }} />
							<PatientStatsWidget
								visitCount={statsData.visitCount}
								ghsAmount={statsData.ghsAmount}
								ghsPercentage={statsData.ghsPercentage}
								npAmount={statsData.npAmount}
								npPercentage={statsData.npPercentage}
								panelAmount={statsData.panelAmount}
								panelPercentage={statsData.panelPercentage}
								pieChartData={pieChartData}
							/>
						</div>
					)}
				</div>
			)}
			<div className="roe-card-style mt-15 mb-30 chart-loading-container">
				<ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
				<div className="roe-card-header">
					<div className="row header-container">
						<div className="float-left">
							<p className="card-main-header">Patient Statistics Breakdown</p>
							<p className="card-sub-header">Overview of all time</p>
						</div>
						<div className="float-right">
							<Button
								onClick={() => SwitchStatistics("Panel")}
								disabled={statType == "Panel"}
								className={classNames(
									"ml-10",
									statType == "Panel" ? "c-dark" : "btn-light"
								)}
								size="sm"
							>
								Panel
              				</Button>
							<Button
								onClick={() => SwitchStatistics("Non Panel")}
								disabled={statType == "Non Panel"}
								className={classNames(
									"ml-10",
									statType == "Non Panel" ? "c-dark" : "btn-light"
								)}
								size="sm"
							>
								Non-Panel
              				</Button>
							<Button
								onClick={() => SwitchStatistics("GHS")}
								disabled={statType == "GHS"}
								className={classNames(
									"ml-10",
									statType == "GHS" ? "c-dark" : "btn-light"
								)}
								size="sm"
							>
								GHS
              				</Button>
						</div>
					</div>
				</div>

				<div className="row mlr-0 mini-widget-container">
					<div className="col-12 col-xl-4 col-md-12 ptb-15">
						<MiniWidgetV1
							iconSource={totalPanelClaimsIcon}
							background={totalPanelClaimsBg}
							className="demo"
							headline={numberFormat(totalNPClaimsCount)}
							subheader={"Total " + statType + " Claims"}
						/>
					</div>
					<div className="col-12 col-xl-4 col-md-12 ptb-15">
						<MiniWidgetV1
							iconSource={totalPanelClaimValueIcon}
							background={totalPanelClaimValueBg}
							className="demo"
							headline={"$" + moneyFormat(totalNPClaims)}
							subheader={"Total " + statType + " Claim Value"}
						/>
					</div>
					<div className="col-12 col-xl-4 col-md-12 ptb-15">
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
		patientData: {
			patientID: state.patient.viewingPatientID,
			topDashboard: state.patient.patientTopDashboard
		}
	};
};

export default connect(mapStateToProps, { getDashboard })(
	PatientOverviewTopDashboard
);
