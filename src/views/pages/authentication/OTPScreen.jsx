import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import CompanyActions from "redux/company/actions";
import './OTPScreen.scss';

const { setCompanyID } = CompanyActions;
const { resendOTP, verifyOTP } = AuthActions;

const OTPScreen = props => {
    const [otpError, setOTPError] = useState(false);
    const [otpTokenFront, setOTPTokenFront] = useState('');

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        if (!props.location.state) {
            props.history.push("/login");
        }
    }, []);

    /**
     * ComponentDidMount when props.location.state changed
     */
    useEffect(() => {
        if (props.location.state) {
            setOTPTokenFront(props.location.state.OTP);
        }
    }, [props.location.state]);

    /**
     * ComponentDidUpdate when props.initialRoute and props.companyMap changed
     */
    useEffect(() => {
        //push initial route to browser history => after login redirect to this initialRoute
        if (props.initialRoute != null && props.initialRoute != "") {
            props.history.push("/" + props.initialRoute);
        }
        //set companyId for login user
        if (props.companyMap != null && props.companyMap.length > 0) {
            props.setCompanyID(props.companyMap[0]);
        }
    }, [props.initialRoute, props.companyMap]);

    /**
     * Resend OTP to login user's email
     */
    const resendOTPHandler = async () => {
        let result = await props.resendOTP();
        if (result && result.success) {
            //error occur
            setOTPTokenFront(result.OTP);
            for (let i = 1; i < 7; i++) {
                //concat 6 digits of rear token
                getCodeBoxElement(i).value = '';
            }
        }
    }

    /**
     * Verify entered OTP token
     */
    const verifyOTPHandler = async () => {
        //gather OTP token from front-rear token.
        let inputToken = `${otpTokenFront}-`;
        for (let i = 1; i < 7; i++) {
            //concat 6 digits of rear token
            inputToken = inputToken.concat(getCodeBoxElement(i).value);
        }
        let result = await props.verifyOTP(inputToken);
        if (result && result.status == 404) {
            //validation error
            setOTPError(true);
        }
    }

    /**
     * Get HTMLDom for 6 digits input elements
     * @param {*} index 
     */
    const getCodeBoxElement = (index) => {
        return document.getElementById('otp' + index);
    }

    /**
     * Handle event keyup of OTP input element
     * @param {*} index index of OTP input element
     * @param {*} event 
     */
    const onKeyUpOTP = (index, event) => {
        const eventCode = event.which || event.keyCode;
        //check if the target is entered value or not. Only 1 digit could be added
        if (getCodeBoxElement(index).value.length === 1) {
            if (index !== 6) {
                //focus and select the text on the next OTP input element
                getCodeBoxElement(index + 1).focus();
                getCodeBoxElement(index + 1).select();
            } else {
                //focus on the verify otp button
                getCodeBoxElement(index).blur();
                document.getElementById('verify-otp').focus();
            }
        }
        if (eventCode === 8 && index !== 1) {
            //when user hit Backspace button => move to the OTP input element infront of it.
            getCodeBoxElement(index - 1).focus();
            getCodeBoxElement(index - 1).select();
        }
    }

    /**
     * Handle event mouse click on an OTP input element
     * @param {*} index 
     */
    const onClickOTP = (index) => {
        if (getCodeBoxElement(index)) {
            //select the text value.
            getCodeBoxElement(index).select();
        }
    }

    return (
        <div id="otp-wrapper">
            <div className="otp-screen-container">
                <div className="logo-header-container">
                    <span className="logo"></span>
                    <span className="logo-text">IHP Nucleus</span>
                </div>
                <div className="back-button-container">
                    <a className="back-to-login"
                        onClick={() => props.history.goBack()}></a>
                </div>
                <div className="background-image"></div>
                <div className="header-container">
                    <div className="header-text">Verify your email</div>
                    <div className="header-information">Signin to your account</div>
                </div>
                <div className="otp-container">
                    <div className="input-information">Enter 6-digit code sent to</div>
                    <div className="login-user-information">{props.location.state.username}</div>
                    <div className="input-container">
                        <div className="front-otp">{otpTokenFront}</div>
                        <div className="rear-otp">
                            <input type="text" id="otp1" maxLength="1" onKeyUp={e => onKeyUpOTP(1, e)} onClick={e => { onClickOTP(1) }} placeholder="-" className="otp-field first-otp" />
                            <input type="text" id="otp2" maxLength="1" onKeyUp={e => onKeyUpOTP(2, e)} onClick={e => { onClickOTP(2) }} placeholder="-" className="otp-field second-otp" />
                            <input type="text" id="otp3" maxLength="1" onKeyUp={e => onKeyUpOTP(3, e)} onClick={e => { onClickOTP(3) }} placeholder="-" className="otp-field third-otp" />
                            <input type="text" id="otp4" maxLength="1" onKeyUp={e => onKeyUpOTP(4, e)} onClick={e => { onClickOTP(4) }} placeholder="-" className="otp-field fourth-otp" />
                            <input type="text" id="otp5" maxLength="1" onKeyUp={e => onKeyUpOTP(5, e)} onClick={e => { onClickOTP(5) }} placeholder="-" className="otp-field fifth-otp" />
                            <input type="text" id="otp6" maxLength="1" onKeyUp={e => onKeyUpOTP(6, e)} onClick={e => { onClickOTP(6) }} placeholder="-" className="otp-field sixth-otp" />
                        </div>
                    </div>
                    <div className="otp-error" hidden={!otpError}>OTP Validation Error!</div>
                </div>
                <a className="resent-otp" onClick={() => resendOTPHandler()}>Resend OTP</a>
                <div className="verify-otp">
                    <input type="submit"
                        id="verify-otp"
                        onClick={verifyOTPHandler}
                        value="VERIFY"
                        className="verify-btn"
                        size="sm" />
                </div>
                <a className="login-other" onClick={() => props.history.push("/login")}>Login with another account</a>
                <div className="linear-vector-container"></div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        initialRoute: state.auth.route,
        companyMap: state.auth.companyMap
    };
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        { setCompanyID, resendOTP, verifyOTP }
    )
)(OTPScreen);
