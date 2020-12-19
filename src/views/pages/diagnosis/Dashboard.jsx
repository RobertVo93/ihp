import React, { Component } from 'react';
import { connect } from 'react-redux';
import DiagnosisOverviewTopDashboard from 'components/diagnosis/overview/DiagnosisOverviewTopDashboard';
import DiagnosisOverviewTopClinicsTable from 'components/diagnosis/overview/DiagnosisOverviewTopClinicsTable';
import DiagnosisOverviewTopPatientsTable from 'components/diagnosis/overview/DiagnosisOverviewTopPatientsTable';

class DiagnosisOverviewDashboard extends Component {

    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Diagnosis Dashboard [{this.props.diagnosisData.diagnosisID}]
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <DiagnosisOverviewTopDashboard
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <DiagnosisOverviewTopClinicsTable
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <DiagnosisOverviewTopPatientsTable
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        diagnosisData: {
            diagnosisID: state.diagnosis.viewingDiagnosisID
        }
    };
}

export default connect(mapStateToProps, null)(DiagnosisOverviewDashboard);
