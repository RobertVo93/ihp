import React from "react";
import { PatientWidgetWrapper } from "./PatientWidget.style.js";
import { personIcon } from "helper/constant";

const PatientWidget = ({
	name,
	empType,
	age,
	companyName,
	gender
}) => {
	return (
		<PatientWidgetWrapper className="roe-card-style mb-15">
			<div className="roe-card-header">
				<div className="header-container">
					<div style={{ textAlign: "left" }}>
						<p className="card-main-header">Patient Details</p>
						<p className="card-sub-header">Overview of all time</p>
					</div>
				</div>
			</div>
			<div className="roe-card-body pt-50">
				<div className="row">
					<div className="col-2 person-image-container">
						<img src={personIcon} className="person-image" alt="profile" />
					</div>
					<div className="col-6">
						<div className="patient-name-container">
							<div className="info-label">Patient Name</div>
							<div className="info-value">{name}</div>
						</div>
						<div className="company-container">
							<div className="info-label">Company</div>
							<div className="info-value">{companyName}</div>
						</div>
					</div>
					<div className="col-2">
						<div className="type-container">
							<div className="info-label">Type</div>
							<div className="info-value">{empType}</div>
						</div>
						<div className="age-container">
							<div className="info-label">Age</div>
							<div className="info-value">{age}</div>
						</div>
					</div>
					<div className="col-2">
						<div className="gender-container">
							<div className="info-label">Gender</div>
							<div className="info-value">{gender}</div>
						</div>
					</div>
				</div>
			</div>
		</PatientWidgetWrapper>
	);
};

export default PatientWidget;

