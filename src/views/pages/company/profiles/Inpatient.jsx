import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyProfileDashboard from 'components/company/profiles/CompanyProfileDashboard';
import CompanyProfileDemographicsSpending from 'components/company/profiles/CompanyProfileDemographicsSpending';
import CompanyProfileTopRelations from 'components/company/profiles/CompanyProfileTopRelations';
import CompanyProfileClassifications from 'components/company/profiles/CompanyProfileClassifications';
import CompanyProfileTopDiagnosis from 'components/company/profiles/CompanyProfileTopDiagnosis';
import CompanyProfileTopProviders from 'components/company/profiles/CompanyProfileTopProviders';
import CompanyProfileTopEmployees from 'components/company/profiles/CompanyProfileTopEmployees';
import CompanyProfileClaimOverMonths from 'components/company/profiles/CompanyProfileClaimOverMonths';
import CompanyProfile from 'components/company/CompanyProfile';

class CompanyInpatientProfile extends Component {

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
                            Company Inpatient Profile Dashboard [{this.props.companyData.companyID}]
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProfileDashboard statMode="Inpatient"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProfileDemographicsSpending statMode="Inpatient"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <CompanyProfileTopRelations statMode="Inpatient"
                            />
                        </div>
                        <div className="col-lg-6">
                            <CompanyProfileClassifications statMode="Inpatient"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProfileTopDiagnosis statMode="Inpatient"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProfileTopProviders statMode="Inpatient"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProfileTopEmployees statMode="Inpatient"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyProfileClaimOverMonths statMode="Inpatient"
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

export default connect(mapStateToProps, null)(CompanyInpatientProfile);
