import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import CompActions from "redux/company/actions";
const { setCompanyID } = CompActions;

const CompanyRedirectHandler = props => {
    //call apis
    let [redirection, setRedirection] = useState("");
    useEffect(() => {
        props.setCompanyID(props.match.params.companyID); //why need to call props?
        //redirect to
        setRedirection(props.match.params.redirectTo);
    }, []);
    return (
        <div>
            { redirection == "overview" && (
                <Redirect to="/company/cmoverview" />
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
    { setCompanyID }
)(CompanyRedirectHandler);