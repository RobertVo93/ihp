import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import PatActions from "redux/patient/actions";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";


const { getTopDiagnosis } = PatActions;


const PatientOverviewTopDiagnosis = props => {
	//call apis
	const [incomingDiagnosis, setIncDiag] = useState([]);
	const [data, setData] = useState({ labels: '', datasets: [] });
	const [hrefLinks, setHrefLinks] = useState([]);
	const [chartLoading, setChartLoading] = useState(false);
	let history = useHistory();

	useEffect(() => {
		//show chart loading
		setChartLoading(true);
		async function fetchData() {
			await props.getTopDiagnosis(props.authData, props.patientData.patientID);
			//Hide chart loading after data load completed
			setChartLoading(false);
		}
		fetchData();
	}, []);

	useEffect(() => {
		setIncDiag(props.patientData.topDiagnosis);
	}, [props.patientData.topDiagnosis]);

	useEffect(() => {
		let labels = [];
		let data = [];
		let hrefLinks = [];
		if (incomingDiagnosis.length == 0) return;
		for (var i = 0; i < incomingDiagnosis.length; i++) {
			if (incomingDiagnosis[i].Diagnosis == null) continue;
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

	return (
		<div>
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
						height={180}
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
	);
};

const mapStateToProps = state => {
	return {
		authData: {
			accessToken: state.auth.accessToken
		},
		patientData: {
			patientID: state.patient.viewingPatientID,
			topDiagnosis: state.patient.patientTopDiagnosis
		}
	};
};

export default connect(mapStateToProps, { getTopDiagnosis })(
	PatientOverviewTopDiagnosis
);
