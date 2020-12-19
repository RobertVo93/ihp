import React, { Component } from 'react';
import { connect } from 'react-redux';
import CMEWDashboard from 'components/claimmanagers/dashboard/CMEarlyWarningDashboard';
import CMEarlyWarningTable from 'components/claimmanagers/earlywarning/CMEarlyWarningTable';

class CompanyOverviewDashboard extends Component {

    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Early Warning Dashboard
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CMEWDashboard
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CMEarlyWarningTable
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

    };
}

export default connect(mapStateToProps, null)(CompanyOverviewDashboard);
