import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import CompanyActions from "redux/company/actions";
import userActions from "redux/account/actions";
import enhancer from "./enhancer/LoginFormEnhancer";
import "./LoginV1.scss";

const { getNewVersionFeatures } = userActions;
const { setCompanyID } = CompanyActions;
const { login } = AuthActions;

const LoginV1 = props => {
  const [rememberMe, setRemember] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount
  } = props;

  /**
   * Handle login submittion
   * @param {*} e
   */
  const handleLogin = async e => {
    e.preventDefault();
    setLoginError(false);
    let { values } = props;

    if (values.email !== "" && values.password !== "") {
      const data = {
        username: values.email,
        password: values.password,
        remember: rememberMe
      };
      let result = await props.login(data);
      if (result && result.status == 404) {
        //wrong email or password
        setLoginError(true);
      } else if (result && result.OTP !== undefined) {
        //redirect to OTP screen
        props.history.push("/otpscreen", result);
      }
    }
  };

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

  useEffect(() => {
    if (props.isLogin) {
      //show new features in the current version
      props.getNewVersionFeatures(props.authData);
    }
  }, [props.isLogin]);

  /**
   * Display Error component
   * @param {*} props
   */
  const Error = props => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span />;
    }
  };

  return (
    <div id="login-wrapper">
      <div className="login-screen-container">
        <div className="logo-header-container">
          <span className="logo"></span>
          <span className="logo-text">IHP Nucleus</span>
        </div>
        <div className="background-image"></div>
        <div className="header-container">
          <div className="header-text">Welcome back!</div>
          <div className="header-information">Signin to your account</div>
        </div>
        <div className="login-error" hidden={!loginError}>
          Wrong Username or Password. Please try again
        </div>
        <form onSubmit={handleLogin} id="login-form">
          <div className="email-container">
            <div className="email-title">USERNAME</div>
            <div className="email-text-container">
              <div className="email-icon-container">
                <div className="email-icon"></div>
              </div>
              <div className="seperate-line"></div>
              <input
                type="text"
                id="email"
                className="email-text"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                placeholder="Email"
              />
              <Error class={"error-msg form-validation-error"} field="email" />
            </div>
          </div>
          <div className="password-container">
            <div className="password-title">PASSWORD</div>
            <div className="password-text-container">
              <div className="password-icon-container">
                <div className="password-icon"></div>
              </div>
              <div className="seperate-line"></div>
              <input
                type="password"
                className="password-text"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
              />
              <Error
                class={"error-msg form-validation-error"}
                field="password"
              />
            </div>
          </div>
          <div>
            <a
              id="forgot-password-span"
              onClick={() => props.history.push("/forgotPassword")}
            >
              Forgot password?
            </a>
          </div>
          <div className="button-container">
            <input
              type="submit"
              value="LOGIN"
              className="login-btn"
              size="sm"
            />
          </div>
          <small>
            IHP Nucleus {process.env.REACT_APP_LAUNCH}.
            {process.env.REACT_APP_SPRINT}
            {process.env.REACT_APP_HOTFIX} Copyright (c) All Rights Reserved IHP
            Malaysia Sdn Bhd.
          </small>
        </form>
        <div className="linear-vector-container"></div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    initialRoute: state.auth.route,
    companyMap: state.auth.companyMap,
    authData: {
      accessToken: state.auth.accessToken
    },
    isLogin: state.auth.isLogin
  };
};

export default compose(
  withRouter,
  enhancer,
  connect(mapStateToProps, { login, setCompanyID, getNewVersionFeatures })
)(LoginV1);
