import React, { useEffect, useState } from 'react';
import CompanyProfileWidget from "components/widgets/profilewidget/CompanyProfileWidget";
import { connect } from 'react-redux';
import CompActions from "redux/company/actions";
import { moneyFormat, numberFormat } from "helper/numberFormat";

const { getCompanyProfile } = CompActions;

const CompanyProfile = (props) => {
    const [companyProfile, setCompanyProfile] = useState({});

    useEffect(() => {
        //get comapny profile
        props.getCompanyProfile(props.authData, props.companyData.companyID);
    }, []);

    useEffect(() => {
        if (!props.companyData.companyProfile) {
            setCompanyProfile({});
        }
        let profile = {};
        profile.name = props.companyData.companyProfile.CoyName;
        profile.address = props.companyData.companyProfile.Address;
        profile.created = props.companyData.companyProfile.EffDt;
        profile.averageBill = "$" + moneyFormat(props.companyData.companyProfile.AClaims);
        profile.totalBill = "$" + moneyFormat(props.companyData.companyProfile.SClaims);
        profile.employeeCount = numberFormat(props.companyData.companyProfile.EmployeeCount);
        profile.dependentCount = numberFormat(props.companyData.companyProfile.DependentCount);
        profile.email = props.companyData.companyProfile.ContactPsnEmail;
        profile.CoyID = props.companyData.companyProfile.CoyID;
        setCompanyProfile(profile);
    }, [props.companyData.companyProfile]);

    /**
     * Edit company profile handler
     */
    const onEditProfile = () => {
        //TODO: handle edit profile
    };

    return (
        <div className="roe-card-style mt-15 mb-30">
            <CompanyProfileWidget
                name={companyProfile.name}
                contactEmail={companyProfile.email}
                address={companyProfile.address}
                created={companyProfile.created}
                averageBill={companyProfile.averageBill}
                totalBill={companyProfile.totalBill}
                employeeCount={companyProfile.employeeCount}
                dependentCount={companyProfile.dependentCount}
                onEditProfileCallback={onEditProfile}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken
        },
        companyData: {
            companyID: state.company.viewingCompanyID,
            companyProfile: state.company.companyProfile
        }
    };
};

export default connect(mapStateToProps, { getCompanyProfile })(
    CompanyProfile
);