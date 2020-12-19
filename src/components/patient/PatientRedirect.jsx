import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PatActions from "redux/patient/actions";
const { setPatientID } = PatActions;

const PatientRedirectHandler = props => {
    //call apis
    let [redirection, setRedirection] = useState("");
    useEffect(() => {
        props.setPatientID(props.match.params.patientID); //why need to call props?
        //redirect to
        setRedirection(props.match.params.redirectTo);
    }, []);
    return (
        <div>
            { redirection == "overview" && (
                <Redirect to="/patient/cmoverview" />
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
    { setPatientID }
)(PatientRedirectHandler);