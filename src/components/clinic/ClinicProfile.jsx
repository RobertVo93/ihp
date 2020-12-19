import React, { useEffect, useState } from 'react';
import ClinicProfileWidget from "components/widgets/profilewidget/ClinicProfileWidget";
import { connect } from 'react-redux';
import ClinicActions from "redux/clinic/actions";
import { moneyFormat, numberFormat } from "helper/numberFormat";

const { getClinicProfile } = ClinicActions;

const ClinicProfile = (props) => {
    const [clinicProfile, setClinicProfile] = useState({});
    useEffect(() => {
        //get clinic profile
        props.getClinicProfile(props.authData, props.clinicData.clinicID);
    }, []);

    useEffect(() => {
        if (!props.clinicData.clinicProfile) {
            setClinicProfile({});
        }
        let profile = {};
        profile.name = props.clinicData.clinicProfile.ClinicName;
        profile.contact = props.clinicData.clinicProfile.ContactPsnPhn;
        profile.address = props.clinicData.clinicProfile.Address;
        profile.created = props.clinicData.clinicProfile.ActiveDt;
        profile.averageBill = "$" + moneyFormat(props.clinicData.clinicProfile.AClaims);
        profile.totalBill = "$" + moneyFormat(props.clinicData.clinicProfile.SClaims);
        profile.employeeVisits = numberFormat(props.clinicData.clinicProfile.EmployeeVisits);
        profile.totalVisits = numberFormat(props.clinicData.clinicProfile.TotalVisits);
        profile.email = props.clinicData.clinicProfile.ContactPsnEmail;
        profile.ClinicID = props.clinicData.clinicProfile.ClinicID;
        setClinicProfile(profile);
    }, [props.clinicData.clinicProfile]);

    /**
     * Edit clinic profile handler
     */
    const onEditProfile = () => {
        //TODO: handle edit profile
    };

    return (
        <div className="roe-card-style mt-15 mb-30">
            <ClinicProfileWidget
                name={clinicProfile.name}
                contact={clinicProfile.contact}
                address={clinicProfile.address}
                created={clinicProfile.created}
                averageBill={clinicProfile.averageBill}
                totalBill={clinicProfile.totalBill}
                employeeVisits={clinicProfile.employeeVisits}
                totalVisits={clinicProfile.totalVisits}
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
        clinicData: {
            clinicID: state.clinic.viewingClinicID,
            clinicProfile: state.clinic.clinicProfile
        }
    };
};

export default connect(mapStateToProps, { getClinicProfile })(
    ClinicProfile
);