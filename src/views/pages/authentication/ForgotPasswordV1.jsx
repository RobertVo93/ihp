import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import auActions from "redux/auth/actions";
import './ForgotPasswordV1.scss';

const { verifyUsername, sendResetPassword } = auActions;

const ForgotPasswordV1 = props => {
    const [emailError, setEmailError] = useState(false);
    const [sendEmailError, setSendEmailError] = useState(false);
    const [email, setEmail] = useState('');

    /**
     * Handle user click submit
     * @param {*} e 
     */
    const handleSubmit = async (e) => {
        //prevent reload form
        e.preventDefault();
        //verify email exist in DB
        let verifyResult = await props.verifyUsername(email);
        setEmailError(!verifyResult.success);
        if (verifyResult.success) {
            //send reset password to the provided email
            let sendEmailResult = await props.sendResetPassword({ Username: email });
            setSendEmailError(!sendEmailResult.success);
            if (sendEmailResult.success) {
                //redirect to announcement page
                props.history.push("/forgotpasswordcompletion");
            }
        }
    }

    return (
        <div id="forgot-password-wrapper">
            <div className="forgot-password-container">
                <div className="logo-header-container">
                    <span className="logo"></span>
                    <span className="logo-text">IHP Nucleus</span>
                </div>
                <div className="back-button-container">
                    <a className="back-to-login"
                        onClick={() => props.history.goBack()}>
                    </a>
                </div>
                <div className="background-image"></div>
                <div className="header-container">
                    <div className="header-text">Forgot Password</div>
                    <div className="header-information">Enter your username to reset password</div>
                    <div className="header-instruction">Enter your username and we will send you a link to reset your password</div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    id="submit-form">
                    <div className="email-text-container">
                        <div className="email-icon-container">
                            <div className="email-icon"></div>
                        </div>
                        <div className="seperate-line"></div>
                        <input
                            type="text"
                            id="email"
                            className="email-text"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            placeholder="Username"
                        />
                        <div className="email-error pt-10" hidden={!emailError}>* We cannot find your username. Please try again.</div>
                        <div className="email-error pt-10" hidden={!sendEmailError}>* We cannot send the reset password to your email. Please contact admin for support.</div>
                    </div>
                    <div className="button-container">
                        <input
                            type="submit"
                            value="Submit"
                            className="submit-btn"
                            size="sm"
                        />
                    </div>
                </form>
                <div className="linear-vector-container"></div>
                <small>
                    IHP Nucleus {process.env.REACT_APP_LAUNCH}.
                    {process.env.REACT_APP_SPRINT}
                    {process.env.REACT_APP_HOTFIX} Copyright (c) All Rights Reserved IHP
                    Malaysia Sdn Bhd.
                </small>
            </div>
        </div>
    );
};

ForgotPasswordV1.prototype = {
}

const mapStateToProps = (state) => {
    return {
    };
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        { verifyUsername, sendResetPassword }
    )
)(ForgotPasswordV1);
