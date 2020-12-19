import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import userActions from 'redux/account/actions'
import enhancer from "../authentication/enhancer/UpdatepasswordEnhancer"
import './Updatepassword.scss'
import { compose } from "redux";

const { updatePassword } = userActions

const Updatepassword = (props) => {
  const resetInfo = useSelector(state => state.account.resetInfo);
  useEffect(() => {
    if (!resetInfo) {
      props.history.push("/");
    }
  }, [resetInfo])

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount
  } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length && values.newpassword) {
      const data = {
        password: values.newpassword
      }
      try {
        const res = await updatePassword(data);
        if (res.data.success) {
          props.history.push("/login");
        }
      } catch (error) {
        props.history.push("/login");
      }

    }
  }

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
    <div id="reset-wrapper">
      <div className="login-screen-container">
        <div className="logo-header-container">
          <span className="logo"></span>
          <span className="logo-text">IHP Nucleus</span>
        </div>
        <div className="background-image"></div>
        <div className="header-container">
          <div className="header-text">Reset Password</div>
          <div className="header-information">Welcome to the IHP Nucleus Portal password reset process, to complete your password reset, please specify a password</div>
        </div>
        <form onSubmit={handleSubmit} id="login-form">
          <div className="newpassword-container">
            <div className="newpassword-title">NEW PASSWORD</div>
            <div className="newpassword-text-container">
              <div className="newpassword-icon-container">
                <div className="password-icon"></div>
              </div>
              <div className="seperate-line"></div>
              <input
                type="password"
                id="newpassword"
                className="newpassword-text"
                onChange={handleChange}
                value={values.newpassword}
                onBlur={handleBlur}
                placeholder="New Password"
              />
              <Error class={"error-msg form-validation-error"} field="newpassword" />
            </div>
          </div>
          <div className="password-container">
            <div className="password-title">CONFIRM PASSWORD</div>
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
                placeholder="Confirm Password"
              />
              <Error
                class={"error-msg form-validation-error"}
                field="password"
              />
            </div>
          </div>
          <div className="button-container">
            <input
              type="submit"
              value="Change Password"
              className="reset-btn"
              size="sm"
            />
          </div>
        </form>
        <div className="linear-vector-container"></div>
      </div>
    </div>
  )
}

export default compose(enhancer)(Updatepassword);
