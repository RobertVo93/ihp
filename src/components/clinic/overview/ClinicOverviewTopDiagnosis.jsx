import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import ClinicActions from "redux/clinic/actions";
import ClinicOverviewTopDiagnosisTable from "./ClinicOverviewTopDiagnosisTable";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import { moneyFormat, numberFormat } from "helper/numberFormat";
import customTooltip from "components/common/chartTooltip";

const { getTopDiagnosis } = ClinicActions;

const ClinicOverviewTopDiagnosis = props => {
	//call apis
	const [incomingData, setIncData] = useState([]);
	const [data, setData] = useState({ labels: "", datasets: [] });
	const [hrefLinks, setHrefLinks] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [chartLoading, setChartLoading] = useState(false);
	let history = useHistory();

	useEffect(() => {
		//show chart loading
		setChartLoading(true);
		async function fetchData() {
			await props.getTopDiagnosis(props.authData, props.clinicData.clinicID);
			//Hide chart loading after data load completed
			setChartLoading(false);
		}
		fetchData();
		//update the data
	}, []);

	useEffect(() => {
		setIncData(props.clinicData.topDiagnosis);
	}, [props.clinicData.topDiagnosis]);

	useEffect(() => {
		let labels = [];
		let data = [];
		let hrefLinks = [];
		let tData = [];
		if (incomingData == null || incomingData.length == 0) return;
		for (var i = 0; i < incomingData.length; i++) {
			if (incomingData[i].Diagnosis == null) continue;
			tData.push({
				no: i + 1,
				Diagnosis: incomingData[i].Diagnosis,
				AClaims: "$" + moneyFormat(incomingData[i].AClaims),
				SClaims: "$" + moneyFormat(incomingData[i].SClaims),
				SCount: numberFormat(incomingData[i].SCount)
			});
			if (i <= 8) {
				//alert(incomingData[i].Diagnosis.length);
				labels.push(
					incomingData[i].Diagnosis.length > 20
						? incomingData[i].Diagnosis.substring(0, 20) + "..."
						: incomingData[i].Diagnosis
				);
				data.push(incomingData[i].SClaims);
				hrefLinks.push(
					"/diagnosis/route/" + incomingData[i].ICDCD + "/overview"
				);
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
		setTableData(tData);
	}, [incomingData]);

	return (
		<div className="row">
			<div className="col-lg-6">
				<div className="roe-card-style mt-15 mb-30 chart-loading-container">
					<ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
					<div className="roe-card-header">
						<div className="row header-container">
							<div className="float-left">
								<p className="card-main-header">Top Diagnosis (Spending)</p>
								<p className="card-sub-header">Overview of all time</p>
							</div>
						</div>
					</div>
					{incomingData.length > 0 && (
						<Doughnut
							data={data}
							height={280}
							options={{
								tooltips: {
									enabled: false,
									custom: customTooltip
								},
								legend: { display: true, position: "bottom" },
								onHover: (event, chartElement) => {
									event.target.style.cursor = chartElement[0]
										? "pointer"
										: "default";
								}
							}}
							onElementsClick={elems => {
								if (hrefLinks[elems[0]?._index]) {
									history.push(hrefLinks[elems[0]._index]);
								}
							}}
						/>
					)}
					{incomingData.length == 0 && !chartLoading && (
						<div style={{ marginLeft: "23px", marginBottom: "15px" }}>
							<p>This chart contains no data</p>
						</div>
					)}
				</div>
			</div>
			<div className="col-lg-6">
				<ClinicOverviewTopDiagnosisTable tData={tableData} />
			</div>
		</div>
	);
};

const FilterComponent = tableInstance => {
	const { filterValue, setFilter } = tableInstance.column;
	return (
		<input
			type="text"
			value={filterValue || ""}
			onChange={e => {
				setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
			}}
			className="tabl-search react-form-input"
			placeholder={`Search ${tableInstance.column.placeholder}`}
			onClick={e => e.stopPropagation()}
		/>
	);
};

const mapStateToProps = state => {
	return {
		authData: {
			accessToken: state.auth.accessToken
		},
		clinicData: {
			clinicID: state.clinic.viewingClinicID,
			topDiagnosis: state.clinic.clinicTopDiagnosis
		}
	};
};

export default connect(mapStateToProps, { getTopDiagnosis })(
	ClinicOverviewTopDiagnosis
);
