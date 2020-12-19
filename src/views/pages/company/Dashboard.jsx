import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyOverviewTopDashboard from 'components/company/overview/CompanyOverviewTopDashboard';
import CompanyOverviewTopMC from 'components/company/overview/CompanyOverviewTopMC';
import CompanyOverviewTopSpending from 'components/company/overview/CompanyOverviewTopSpending';
import CompanyOverviewTopDiagnosis from 'components/company/overview/CompanyOverviewTopDiagnosis';
import CompanyOverviewTopClaimMonths from 'components/company/overview/CompanyOverviewTopClaimMonths';
import CompanyProfile from 'components/company/CompanyProfile';

class CompanyOverviewDashboard extends Component {

    render() {

        return (
            <div>
                {/*<PageTitle title="sidebar.dashboard" />*/}

                <div className="plr-15">
                    <div className="row">
						<div className="col-lg-12">
							<CompanyProfile />
						</div>
					</div>
                    
                    <div className="mtb-30 theme-color">
                        <div className="introduction">
                            Company Dashboard [{this.props.companyData.companyID}]
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyOverviewTopDashboard
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyOverviewTopMC
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyOverviewTopSpending
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyOverviewTopDiagnosis
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyOverviewTopClaimMonths
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

export default connect(mapStateToProps, null)(CompanyOverviewDashboard);
