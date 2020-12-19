import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import CompActions from "redux/company/actions";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

const { getCompanyTopDiagnosis, getCompanyTopDiagnosisMC } = CompActions;

const CompanyOverviewTopDiagnosis = props => {
	//call apis
	const [incomingDiagnosis, setIncDiag] = useState([]);
	const [incomingDiagnosisMC, setIncDiagMC] = useState([]);
	const [data, setData] = useState({ labels: '', datasets: [] });
	const [dataMC, setDataMC] = useState({ labels: '', datasets: [] });
	const [hrefLinks, setHrefLinks] = useState([]);
	const [hrefMCLinks, setHrefMCLinks] = useState([]);
	const [chartLoading, setChartLoading] = useState(false);
	const [chartMCLoading, setChartMCLoading] = useState(false);

	let history = useHistory();
	useEffect(() => {
		//show chart loading
		setChartLoading(true);
		setChartMCLoading(true);
		async function CompanyTopDiagnosis() {
			await props.getCompanyTopDiagnosis(props.authData, props.companyData.companyID);
			//Hide chart loading after data load completed
			setChartLoading(false);
		}
		async function CompanyTopDiagnosisMC() {
			await props.getCompanyTopDiagnosisMC(props.authData, props.companyData.companyID);
			//Hide chart loading after data load completed
			setChartMCLoading(false);
		}
		CompanyTopDiagnosis();
		CompanyTopDiagnosisMC()
		//update the data
	}, []);

	useEffect(() => {
		setIncDiag(props.companyData.companyTopDiagnosis);
	}, [props.companyData.companyTopDiagnosis]);

	useEffect(() => {
		setIncDiagMC(props.companyData.companyTopDiagnosisMC);
	}, [props.companyData.companyTopDiagnosisMC]);

	useEffect(() => {
		let labels = [];
		let data = [];
		let hrefLinks = [];
		if (incomingDiagnosis.length == 0) return;
		for (var i = 0; i < incomingDiagnosis.length; i++) {
			if (i <= 8) {
				labels.push(
					incomingDiagnosis[i].Diagnosis.length > 20
						? incomingDiagnosis[i].Diagnosis.substring(0, 20) + "..."
						: incomingDiagnosis[i].Diagnosis
				);
				data.push(incomingDiagnosis[i].SClaims);
				hrefLinks.push(
					"/diagnosis/route/" + incomingDiagnosis[i].ICDCD + "/overview"
				);
			} else {
				break;
			}
		}
		const dataTemp = {
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: ["#5073B8", "#0F98AD", "#0AB39C", "#5EC778", "#219653", "#F16548", "#EA557F", "#A166AB", "#6E1C74", "#56CCF2", "#2F80ED", "#F1963A"],
					hoverBackgroundColor: [
						chroma("#5073B8").alpha(0.8).css(),
						chroma("#0F98AD").alpha(0.8).css(),
						chroma("#0AB39C").alpha(0.8).css(),
						chroma("#5EC778").alpha(0.8).css(),
						chroma("#219653").alpha(0.8).css(),
						chroma("#F16548").alpha(0.8).css(),
						chroma("#EA557F").alpha(0.8).css(),
						chroma("#A166AB").alpha(0.8).css(),
						chroma("#6E1C74").alpha(0.8).css(),
						chroma("#56CCF2").alpha(0.8).css(),
						chroma("#2F80ED").alpha(0.8).css(),
						chroma("#F1963A").alpha(0.8).css(),
					]
				}
			]
		};
		setHrefLinks(hrefLinks);
		setData(dataTemp);
	}, [incomingDiagnosis]);

	useEffect(() => {
		let labels = [];
		let data = [];
		let hrefLinks = [];
		if (incomingDiagnosisMC.length == 0) return;
		for (var i = 0; i < incomingDiagnosisMC.length; i++) {
			if (i <= 8) {
				labels.push(
					incomingDiagnosisMC[i].Diagnosis.length > 20
						? incomingDiagnosisMC[i].Diagnosis.substring(0, 20) + "..."
						: incomingDiagnosisMC[i].Diagnosis
				);
				data.push(incomingDiagnosisMC[i].SMC);
				hrefLinks.push(
					"/diagnosis/route/" + incomingDiagnosisMC[i].ICDCD + "/overview"
				);
			} else {
				break;
			}
		}
		const dataTemp = {
			labels: labels,
			datasets: [
				{
					label: "Utilization Sum",
					backgroundColor: ["#5073B8", "#0F98AD", "#0AB39C", "#5EC778", "#219653", "#F16548", "#EA557F", "#A166AB", "#6E1C74", "#56CCF2", "#2F80ED", "#F1963A"],
					hoverBackgroundColor: [
						chroma("#5073B8").alpha(0.8).css(),
						chroma("#0F98AD").alpha(0.8).css(),
						chroma("#0AB39C").alpha(0.8).css(),
						chroma("#5EC778").alpha(0.8).css(),
						chroma("#219653").alpha(0.8).css(),
						chroma("#F16548").alpha(0.8).css(),
						chroma("#EA557F").alpha(0.8).css(),
						chroma("#A166AB").alpha(0.8).css(),
						chroma("#6E1C74").alpha(0.8).css(),
						chroma("#56CCF2").alpha(0.8).css(),
						chroma("#2F80ED").alpha(0.8).css(),
						chroma("#F1963A").alpha(0.8).css(),
					],
					data: data
				}
			]
		};
		setHrefMCLinks(hrefLinks);
		setDataMC(dataTemp);
	}, [incomingDiagnosisMC]);

	return (
		<div className="row">
			<div className="col-lg-6">
				<div className="roe-card-style mt-15 mb-30 chart-loading-container">
					<ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
					<div className="roe-card-header">
						<div className="row header-container">
							<div className="float-left">
								<p className="card-main-header">Top Diagnosis Expenditure</p>
								<p className="card-sub-header">Overview of all time</p>
							</div>
						</div>
					</div>
					{incomingDiagnosis.length > 0 && (
						<Doughnut
							data={data}
							height={280}
							options={{
								legend: { display: true, position: "bottom" },
								onHover: (event, chartElement) => {
									event.target.style.cursor = chartElement[0]
										? "pointer"
										: "default";
								},
								tooltips: {
									enabled: false,
									custom: customTooltip
								},
							}}
							onElementsClick={elems => {
								if (hrefLinks[elems[0]?._index]) {
									history.push(hrefLinks[elems[0]._index]);
								}
							}}
						/>
					)}
					{incomingDiagnosis.length == 0 && !chartLoading && (
						<div style={{ marginLeft: "23px", marginBottom: "15px" }}>
							<p>This chart contains no data</p>
						</div>
					)}
				</div>
			</div>
			<div className="col-lg-6">
				<div className="roe-card-style mt-15 mb-30 chart-loading-container">
					<ChartLoading isLoading={chartMCLoading} style={{ borderRadius: '6px' }} />
					<div className="roe-card-header">
						<div className="row header-container">
							<div className="float-left">
								<p className="card-main-header">Top Diagnosis vs MC</p>
								<p className="card-sub-header">Overview of all time</p>
							</div>
						</div>
					</div>
					{incomingDiagnosisMC.length > 0 && (
						<Doughnut
							data={dataMC}
							height={280}
							options={{
								tooltips: {
									enabled: false,
									custom: customTooltip
								},
								legend: { display: true, position: "bottom" }
							}}
							onElementsClick={elems => {
								if (hrefMCLinks[elems[0]?._index]) {
									history.push(hrefMCLinks[elems[0]._index]);
								}
							}}
						/>
					)}
					{incomingDiagnosisMC.length == 0 && !chartMCLoading && (
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
			companyTopDiagnosis: state.company.companyTopDiagnosis,
			companyTopDiagnosisMC: state.company.companyTopDiagnosisMC
		}
	};
};

export default connect(mapStateToProps, {
	getCompanyTopDiagnosis,
	getCompanyTopDiagnosisMC
})(CompanyOverviewTopDiagnosis);
