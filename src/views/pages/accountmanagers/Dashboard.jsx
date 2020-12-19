import React, { Component } from 'react';
import { connect } from 'react-redux';
import AMTopDashboard from 'components/accountmanagers/dashboard/AMTopDashboard';
import AMDashboardLiveGrowth from 'components/accountmanagers/dashboard/AMDashboardLiveGrowth';
import AMRecentCompaniesTable from 'components/accountmanagers/dashboard/AMRecentCompanyTable';
import AMTopBrokers from 'components/accountmanagers/dashboard/AMTopBrokerTable';

class AMDashboard extends Component {

    render() {

        return (
            <div>
                {/*<PageTitle title="sidebar.dashboard" />*/}

                <div className="plr-15">
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Account Manager Dashboard
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <AMTopDashboard />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <AMDashboardLiveGrowth />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <AMRecentCompaniesTable />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <AMTopBrokers />
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