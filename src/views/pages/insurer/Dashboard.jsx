import React, { Component } from 'react';
import { connect } from 'react-redux';
import CMTopDashboard from 'components/claimmanagers/dashboard/CMTopDashboard';
import CMEWDashboard from 'components/claimmanagers/dashboard/CMEarlyWarningDashboard';
import CMTopCompanyDashboard from 'components/claimmanagers/dashboard/CMTopCompanyDashboard';
import CMTopClinicsDashboard from 'components/claimmanagers/dashboard/CMTopClinicsDashboard';
import CMTopDiagnosisDashboard from 'components/claimmanagers/dashboard/CMTopDiagnosis';
import CMTopClassificationDashboard from 'components/claimmanagers/dashboard/CMTopClassfications';
import CMClaimsOverMonthsDashboard from 'components/claimmanagers/dashboard/CMClaimsOverMonths';
import CMTopProviders from 'components/claimmanagers/dashboard/CMTopProviders';

class AMDashboard extends Component {

    render() {
        return (
            <div>
                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Portfolio Statistics
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CMTopDashboard />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CMEWDashboard />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CMTopCompanyDashboard />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CMTopProviders />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CMTopClinicsDashboard />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <CMTopDiagnosisDashboard />
                        </div>
                        <div className="col-lg-6">
                            <CMTopClassificationDashboard />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CMClaimsOverMonthsDashboard />
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

export default connect(mapStateToProps, null)(AMDashboard);