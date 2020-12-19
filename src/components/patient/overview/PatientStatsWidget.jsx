import React from "react";
import { PatientStatsWidgetWrapper } from "./PatientStatsWidget.style.js";
import { Doughnut } from "react-chartjs-2";
import customTooltip from "components/common/chartTooltip";
import { moneyFormat, numberFormat } from "helper/numberFormat.js";

const options = {
	tooltips: {
		enabled: false,
		custom: customTooltip
	},
	cutoutPercentage: 60,
	animationEasing: "easeOutBounce",
	animateRotate: true,
	animateScale: false,
	responsive: true,
	maintainAspectRatio: false,
	showScale: true,
	legend: {
		display: false
	},
	layout: {
		padding: {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}
	}
};

const PatientStatsWidget = ({
	visitCount,
	ghsAmount,
	ghsPercentage,
	npAmount,
	npPercentage,
	panelAmount,
	panelPercentage,
	pieChartData
}) => {
	return (
		<PatientStatsWidgetWrapper className="roe-card-style">
			<div className="roe-card-header">
				<div className="header-container">
					<div style={{ textAlign: "left" }}>
						<p className="card-main-header">Patient Statistics at a Glance</p>
						<p className="card-sub-header">Overview of all time</p>
					</div>
				</div>
			</div>
			<div className="roe-card-body row">
				<div className="col-md-8 legend-wrapper">
					<div className="d-flex flex-column justify-content-center">
						<div className="d-flex align-items-center">
							<div className="square-indicator group-legend mr-2"></div>
							{ghsAmount != null && (
								<h4 className="mb-0 text-dark info-value">
									${moneyFormat(ghsAmount)} ({ghsPercentage})
								</h4>
							)}
						</div>
						<small className="text-muted ml-3 info-label">
							{"Group Surgical & Hospitalization"}
						</small>
					</div>
					<div className="d-flex flex-column justify-content-center border-top border-bottom py-3 mt-3 mb-3">
						<div className="d-flex align-items-center">
							<div className="square-indicator group-non-panel mr-2"></div>
							{npAmount != null && (
								<h4 className="mb-0 text-dark info-value">
									${moneyFormat(npAmount)} ({npPercentage})
								</h4>
							)}
						</div>
						<small className="text-muted ml-3 info-label">
							Non Panel (Reimbursement)
						</small>
					</div>
					<div className="d-flex flex-column justify-content-center">
						<div className="d-flex align-items-center">
							<div className="square-indicator group-panel mr-2"></div>
							{panelAmount != null && (
								<h4 className="mb-0 text-dark info-value">
									${moneyFormat(panelAmount)} ({panelPercentage})
								</h4>
							)}
						</div>
						<small className="text-muted ml-3 info-label">Panel (Cashless)</small>
					</div>
				</div>
				<div className="col-md-4 aligner-wrapper">
					<div className="aligner-container">
						<div className="chart-container">
							<Doughnut data={pieChartData} options={options} />
						</div>
					</div>
					<div className="visit-count-container">
						<div className="visit-count">
							<h4 className="d-block text-center mb-0 text-muted">
								{numberFormat(visitCount)}
							</h4>
							<small className="d-block text-center mb-2 text-muted">
								Visit Count
						</small>
						</div>
					</div>
				</div>
			</div>
		</PatientStatsWidgetWrapper>
	);
};

export default PatientStatsWidget;
