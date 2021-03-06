import React, { useEffect } from "react";
import { loginBack, iconDemo } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import CompanyActions from "redux/company/actions";
import enhancer from "./enhancer/LoginFormEnhancer";

const { setCompanyID } = CompanyActions;
const { login } = AuthActions;

const Login = props => {
    const handleLogin = e => {
        e.preventDefault();
        let { values, handleSubmit } = props;

        if (values.email !== "" && values.password !== "") {

            const data = {
                token: "DEMOJWTTOKEN",
                username: values.email,
                password: values.password
            };
            // using this method you can store token in redux
            props.login(data);
        }
    };

    useEffect(() => {
        if (props.initialRoute != null && props.initialRoute != "") {
            props.history.push("/" + props.initialRoute);
        };

        if (props.companyMap != null && props.companyMap.length > 0) {
            props.setCompanyID(props.companyMap[0]);
        }
    }, [props.initialRoute, props.companyMap]);

    const { values, handleChange, handleBlur, errors, touched, submitCount } = props;

    const loginContainer = {
        backgroundImage: `url(${loginBack})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        position: "fixed",
        overflow: "auto",
        top: 0,
        bottom: 0,
    };

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
        <div className="container-fluid" style={loginContainer}>
            <div className="form-container">
                <div className="login-icon">
                    <img src={iconDemo} alt="icon" height="100px" />
                </div>
                <div className="login-title">Sign in to your account</div>
                <form className="pa-24" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control react-form-input"
                            id="email"
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}
                            placeholder="Email"
                        />
                        <Error field="email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control react-form-input"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Password"
                        />
                        <Error field="password" />
                    </div>

                    <div className="form-check text-center mtb-16">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                        >
                            Remember me
                        </label>
                    </div>

                    <button type="submit" className="btn form-button">
                        Login
                    </button>
                    <div
                        className="text-center link-label"
                        onClick={() => props.history.push("/forgotPassword")}
                    >
                        Forgot Password ?
                    </div>
                </form>
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
    enhancer,
    connect(
        mapStateToProps,
        { login, setCompanyID }
    )
)(Login);
