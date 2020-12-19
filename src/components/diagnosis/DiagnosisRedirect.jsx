import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import DiagActions from "redux/diagnosis/actions";
const { setDiagnosisID } = DiagActions;

const DiagnosisRedirectHandler = props => {
    //call apis
    let [redirection, setRedirection] = useState("");
    useEffect(() => {
        props.setDiagnosisID(props.match.params.diagnosisID); //why need to call props?
        //redirect to
        setRedirection(props.match.params.redirectTo);
    }, []);
    return (
        <div>
            { redirection == "overview" && (
                <Redirect to="/diagnosis/cmoverview" />
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
    { setDiagnosisID }
)(DiagnosisRedirectHandler);