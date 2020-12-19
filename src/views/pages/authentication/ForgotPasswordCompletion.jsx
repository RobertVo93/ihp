import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import auActions from "redux/auth/actions";
import utiliesAction from "redux/utilities/actions";
import styled from "styled-components";
import { forgotPasswordCompletionBg, ihpWhiteLogo, successEmailIcon } from "helper/constant";

const ForgotPasswordCompletionWrapper = styled.div`
    height: 100vh;
    .bg-container {
        background-image: url('${forgotPasswordCompletionBg}');
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: cover;
        overflow: auto;
        .wrapper {
            width: 100%;
            padding: 30px;
            .logo-container {
                width: 199px;
                height: 110px;
                margin: auto;
                margin-bottom: 50px;
            }
            .forgot-email-form-container {
                background: #FFFFFF;
                border-radius: 8px;
                width: 500px;
                margin: auto;
                padding: 20px;
                text-align: center;
    
                .form-issue,
                .form-email,
                .form-icon,
                .change-email,
                .form-information
                {
                    font-family: "Noto Sans";
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 24px;
                    margin-bottom: 20px;
                }
                .form-email {
                    font-weight: bold;
                }
                .change-email a{
                    text-decoration: none;
                }
                .email-error {
                    font-family: "Noto Sans";
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 22px;
                    color: #FF0000;
                }
                .resend-btn {
                    height: 45px;
                    width: 40vh;
                    background: #A14DA7;
                    border-radius: 4px;
                    color: #FFFFFF;
                    &:hover {
                        opacity: 0.8;
                      }
                }
            }
        }
    }
`;

const { sendResetPassword } = auActions;
const { updateLoading } = utiliesAction;

const ForgotPasswordCompletion = props => {
    const [sendEmailError, setSendEmailError] = useState(false);

    /**
     * Handle user click Resend reset password
     */
    const handleResendResetPassword = async () => {
        //show loading
        props.updateLoading(true);
        let sendEmailResult = await props.sendResetPassword({ Username: props.forgotEmail });
        //hide loading
        props.updateLoading(false);
        setSendEmailError(!sendEmailResult.success);
    }

    return (
        <ForgotPasswordCompletionWrapper>
            <div className="bg-container">
                <div className="wrapper">
                    <div className="logo-container">
                        <img src={ihpWhiteLogo} />
                    </div>
                    <div className="forgot-email-form-container">
                        <div className="form-icon"><img src={successEmailIcon} /></div>
                        <div className="form-text">
                            We have sent you an email to
                        </div>
                        <div className="form-email">
                            {props.forgotEmail}
                        </div>
                        <div className="change-email">
                            <a href="" onClick={() => props.history.push("/forgotpassword")}>Change user</a>
                        </div>
                        <div className="form-information">
                            Click the button in the email to reset your password.
                            If you do not see the email, check other places it might be, like junk, spam, social, or other folder
                        </div>
                        <div className="form-issue">
                            Still did not receive the email?
                        </div>
                        <div className="email-error pt-10" hidden={!sendEmailError}>* We cannot send the reset password to your email. Please contact admin for support.</div>
                        <input
                            type="button"
                            value="Resend email"
                            className="resend-btn"
                            size="sm"
                            onClick={handleResendResetPassword}
                        />
                    </div>
                </div>
            </div>
        </ForgotPasswordCompletionWrapper>
    );
};

const mapStateToProps = state => {
    return {
        forgotEmail: state.auth.forgotPasswordEmail
    };
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        { updateLoading, sendResetPassword }
    )
)(ForgotPasswordCompletion);
