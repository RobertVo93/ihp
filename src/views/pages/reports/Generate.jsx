import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportGenerateForm from 'components/reports/generate/ReportGenerateForm';

class ReportsGenerate extends Component {

    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Generate Report
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <ReportGenerateForm />
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

export default connect(mapStateToProps, null)(ReportsGenerate);
