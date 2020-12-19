import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyProductivityDashboard from 'components/company/productivity/CompanyProductivityDashboard';
import CompanyProductivityDemographics from 'components/company/productivity/CompanyProductivityDemographics';
import CompanyProductivityTopEmployees from 'components/company/productivity/CompanyProductivityTopEmployees';
import CompanyProductivityTopClinicHoppers from 'components/company/productivity/CompanyProductivityTopClinicHoppers';
import CompanyProductivityMCOverMonths from 'components/company/productivity/CompanyProductivityMCOverMonths';
import CompanyProfile from 'components/company/CompanyProfile';

class CompanyProductivity extends Component {

    render() {

        return (
            <div>
                {/*<PageTitle title="sidebar.dashboard" />*/}

                <div className="plr-15">
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProfile
                            />
                        </div>
                    </div>
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Company Productivity Dashboard [{this.props.companyData.companyID}]
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProductivityDashboard
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProductivityDemographics
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProductivityTopEmployees
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProductivityTopClinicHoppers
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProductivityMCOverMonths
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
        companyData: {
            companyID: state.company.viewingCompanyID
        }
    };
}

export default connect(mapStateToProps, null)(CompanyProductivity);
