import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatientOverviewTopDashboard from 'components/patient/overview/PatientOverviewTopDashboard';
import PatientOverviewVisitsTable from 'components/patient/overview/PatientOverviewVisitsTable';
import PatientOverviewTopDiagnosis from 'components/patient/overview/PatientOverviewTopDiagnosis';
import PatientOverviewTopClinics from 'components/patient/overview/PatientOverviewTopClinics';
import PatientOverviewVisitsByMonths from 'components/patient/overview/PatientOverviewVisitsByMonths';
import PatientVisitTimeline from 'components/patient/overview/PatientVisitTimeline';

class PatientOverviewDashboard extends Component {

    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Patient Dashboard [{this.props.patientData.patientID}]
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <PatientOverviewTopDashboard />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <PatientVisitTimeline />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <PatientOverviewVisitsTable />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <PatientOverviewTopDiagnosis />
                        </div>
                        <div className="col-lg-6">
                            <PatientOverviewTopClinics />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <PatientOverviewVisitsByMonths />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        patientData: {
            patientID: state.patient.viewingPatientID
        }
    };
}

export default connect(mapStateToProps, null)(PatientOverviewDashboard);
