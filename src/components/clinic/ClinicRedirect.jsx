import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import ClinicActions from "redux/clinic/actions";
const { setClinicID } = ClinicActions;

const ClinicRedirectHandler = props => {
    //call apis
    let [redirection, setRedirection] = useState("");
    useEffect(() => {
        props.setClinicID(props.match.params.clinicID); //why need to call props?
        //redirect to
        setRedirection(props.match.params.redirectTo);
    }, []);
    return (
        <div>
            { redirection == "overview" && (
                <Redirect to="/clinic/cmoverview" />
            )
            }

        </div>
    );
};

const mapStateToProps = state => {
    return {
        authData: {
            accessToken: state.auth.accessToken,
        }
    };
};

export default connect(
    mapStateToProps,
    { setClinicID }
)(ClinicRedirectHandler);