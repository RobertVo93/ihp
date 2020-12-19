import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import CMActions from "redux/claimmanagers/actions";
import { useHistory } from "react-router-dom";
import ChartLoading from "views/ChartLoading";
import customTooltip from "components/common/chartTooltip";
import CustomRangeDatepickerWidget from "components/widgets/customdatepickerwidget/CustomRangeDatepickerWidget";

const { getTopClinicUtilization } = CMActions;

const CMTopClinicsDashboard = props => {
	//Define states
	const [incomingData, setIncData] = useState([]);
	const [data, setData] = useState({ labels: '', datasets: [] });
	const [hrefLinks, setHrefLinks] = useState([]);
	const [chartLoading, setChartLoading] = useState(false);
	//initial start-end date of range time
	const today = new Date();
	today.setDate(0);	//previous month
	const [startDate, setStartDate] = useState(today);
	const [endDate, setEndDate] = useState(new Date());
	let history = useHistory();

	/**
	 * ComponentDidMount
	 */
	useEffect(() => {
		//show chart loading
		setChartLoading(true);
		async function fetchData() {
			await props.getTopClinicUtilization(props.authData);
			//Hide chart loading after data load completed
			setChartLoading(false);
		}
		fetchData();
	}, []);

	/**
	 * ComponentDidUpdate
	 * Observe object: props.cmData.topClinicUtilization
	 */
	useEffect(() => {
		setIncData(props.cmData.topClinicUtilization);
	}, [props.cmData.topClinicUtilization])

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
				//avoid incomingData[i].ClinicName is null
				if (incomingData[i].ClinicName == null) continue;
				labels.push(
					incomingData[i].ClinicName.length > 20
						? incomingData[i].ClinicName.substring(0, 20) + "..."
						: incomingData[i].ClinicName
				);
				data.push(incomingData[i].SCount);
				hrefLinks.push("/clinic/route/" + incomingData[i].ClinicName + "/overview");
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

	/**
	 * Handle Select range time of datepicker
	 * @param {*} start 
	 * @param {*} end 
	 */
	const onSelectRangeDatepickerHandler = (start, end) => {
		setStartDate(start);
		setEndDate(end);
	}

	return (
		<div>
			<div className="roe-card-style mt-15 mb-30 chart-loading-container">
				<ChartLoading isLoading={chartLoading} style={{ borderRadius: '6px' }} />
				<div className="roe-card-header">
					<div className="row header-container">
						<div className="float-left">
							<p className="card-main-header">Top Clinics Visits</p>
							<p className="card-sub-header">Overview of all time</p>
						</div>
						<div className="float-right">
							<CustomRangeDatepickerWidget inline={false}
								initStart={startDate}
								initEnd={endDate}
								onSelectRange={onSelectRangeDatepickerHandler} />
						</div>
					</div>
				</div>
				<Doughnut
					data={data}
					height={100}
					options={{
						tooltips: {
							enabled: false,
							custom: customTooltip
						},
						legend: { position: "bottom" },
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
			topClinicUtilization: state.claimmanagers.topClinicUtilization
		}
	};
};

export default connect(mapStateToProps, { getTopClinicUtilization })(
	CMTopClinicsDashboard
);
