import React, { Component } from 'react';
import { connect } from 'react-redux';
import MedicalEscalationsAllTable from 'components/medicalescalations/MedicalEscalationsAllTable';

class MedicalEscalationDashboard extends Component {

    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Medical Escalation Dashboard
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <MedicalEscalationsAllTable />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps, null)(MedicalEscalationDashboard);
