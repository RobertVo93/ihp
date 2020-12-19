import React, { Component } from "react";
import { connect } from "react-redux";
import ClinicOverviewTopDashboard from "components/clinic/overview/ClinicOverviewTopDashboard";
import ClinicOverviewVisitsTable from "components/clinic/overview/ClinicOverviewVisitsTable";
import ClinicProfile from "components/clinic/ClinicProfile";
import ClinicOverviewTopCompany from "components/clinic/overview/ClinicOverviewTopCompany";
import ClinicOverviewTopDoctorTable from "components/clinic/overview/ClinicOverviewTopDoctorTable";
import ClinicOverviewTopDiagnosis from "components/clinic/overview/ClinicOverviewTopDiagnosis";
import ClinicOverviewTopDiagnosisPatient from "components/clinic/overview/ClinicOverviewTopDiagnosisPatient";

class ClinicOverviewDashboard extends Component {
	render() {
		return (
			<div>
				<div className="plr-15">
					<div className="row">
						<div className="col-lg-12">
							<ClinicProfile />
						</div>
					</div>
					<div className="mtb-30 theme-color">
						<div className="introduction">
							Clinic Dashboard [{this.props.clinicData.clinicID}]
            			</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<ClinicOverviewTopDashboard />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<ClinicOverviewTopDiagnosisPatient />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<ClinicOverviewTopCompany />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<ClinicOverviewTopDiagnosis />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<ClinicOverviewVisitsTable />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<ClinicOverviewTopDoctorTable />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		clinicData: {
			clinicID: state.clinic.viewingClinicID
		}
	};
};

export default connect(mapStateToProps, null)(ClinicOverviewDashboard);
