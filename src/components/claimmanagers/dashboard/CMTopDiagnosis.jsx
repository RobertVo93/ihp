import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import CMActions from "redux/claimmanagers/actions";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";

const { getTopDiagnosis } = CMActions;

const CMTopDiagnosis = props => {
	//Define states
	const [incomingData, setIncData] = useState([]);
	const [data, setData] = useState({ labels: '', datasets: [] });
	const [hrefLinks, setHrefLinks] = useState([]);
	const [chartLoading, setChartLoading] = useState(false);
	let history = useHistory();

	/**
	 * ComponentDidMount
	 */
	useEffect(() => {
		//show chart loading
		setChartLoading(true);
		async function fetchData() {
			await props.getTopDiagnosis(props.authData);
			//Hide chart loading after data load completed
			setChartLoading(false);
		}
		fetchData();
	}, []);

	/**
	 * ComponentDidUpdate
	 * Observe object: props.cmData.topDiagnosis
	 */
	useEffect(() => {
		setIncData(props.cmData.topDiagnosis);
	}, [props.cmData.topDiagnosis]);

	/**
	 * ComponentDidUpdate
	 * Observe object: IncomingData
	 */
	useEffect(() => {
		if (incomingData == null || incomingData.length == 0)
			return;
		let labels = [];
		let data = [];
		let hrefLinks = [];
		//Convert data to chart's data
		for (var i = 0; i < incomingData.length; i++) {
			if (i < 10) {
				//avoid incomingData[i].Diagnosis is null
				if (incomingData[i].Diagnosis == null) continue;
				labels.push(`${incomingData[i].Diagnosis} (${incomingData[i].VType}) [${incomingData[i].SCount}]`);
				data.push(incomingData[i].SCount);
				hrefLinks.push("/diagnosis/route/" + incomingData[i].ICDCD + "/overview");
			}

		}
		//config chart's data
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
		//Update states
		setHrefLinks(hrefLinks);
		setData(dataTemp);
	}, [incomingData]);

	return (
		<div>
			<div className="roe-card-style mt-15 mb-30 chart-loading-container">
				<ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
				<div className="roe-card-header">
					<div className="row header-container">
						<div className="float-left">
							<p className="card-main-header">Top Diagnosis (By Visit Count)</p>
							<p className="card-sub-header">Overview of all time</p>
						</div>
					</div>
				</div>
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
				<div className="mb-30"></div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		authData: {
			accessToken: state.auth.accessToken
		},
		cmData: {
			topDiagnosis: state.claimmanagers.topDiagnosis
		}
	};
};

export default connect(mapStateToProps, { getTopDiagnosis })(CMTopDiagnosis);
