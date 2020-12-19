import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlertEscalations from 'components/alertescalations/AlertEscalationsDashboard';

class AlertEscalationsDashboard extends Component {

    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Alert Escalations Dashboard
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <AlertEscalations />
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

export default connect(mapStateToProps, null)(AlertEscalationsDashboard);
