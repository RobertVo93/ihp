import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyBreakdown from 'components/company/breakdown/CompanyBreakdown';
import CompanyRelations from 'components/company/breakdown/CompanyRelations';
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
                            Company Breakdown Dashboard [{this.props.companyData.companyID}]
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyBreakdown
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <CompanyRelations
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
