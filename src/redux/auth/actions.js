import {
    authLogin,
    regetJWTToken,
    resendOTP,
    verifyUsername,
    sendResetPassword,
    verifyOTP
} from './authApi';

const authActions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'FORCEDLOGOUT',
    FORGOTPASSWORDEMAIL: 'FORGOTPASSWORDEMAIL',
    UPDATEUSERINFO: 'UPDATEUSERINFO',
    REGETJWTTOKEN: 'REGETJWTTOKEN',

    login: (data) => {
        return dispatch => {
            return authLogin(data).then(response => {
                if (response.success) {
                    if (response.OTP !== undefined) {
                        //In case OTP authentication is enabled
                        return response;
                    } else {
                        //No OTP authentication is required
                        dispatch({
                            type: authActions.LOGIN,
                            isLogin: true,
                            userID: response.frontUserDetails.userID,
                            accessToken: response.jwtToken,
                            permissions: JSON.parse(response.frontUserDetails.permissions),
                            allowedRoutes: JSON.parse(response.frontUserDetails.allowedRoutes),
                            route: response.frontUserDetails.route,
                            companyMap: response.frontUserDetails.companyMap,
                            subColor: response.frontUserDetails.subColor,
                            logo: response.frontUserDetails.logo_url,
                            logo_mime: response.frontUserDetails.logo_mime,
                            mainColor: response.frontUserDetails.mainColor,
                        });
                    }
                } else {
                    dispatch({
                        type: authActions.LOGOUT,
                        isLogin: false,
                        userID: null,
                        accessToken: null,
                        permissions: null,
                        allowedRoutes: null,
                        route: null,
                        companyMap: null,
                        subColor: null,
                        logo: null,
                        logo_mime: null,
                        mainColor: null,
                    });
                }
            }, error => {
                return error.response;
            });
        }
    },
    logout: () => {

        return dispatch => {
            dispatch({
                type: authActions.LOGOUT
            });
        }
    },
    resendOTP: (userObject) => {
        return dispatch => {
            return resendOTP(userObject).then(response => {
                return response;
            });
        }
    },
    verifyOTP: (userObject) => {
        return dispatch => {
            return verifyOTP(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: authActions.LOGIN,
                        isLogin: true,
                        userID: response.frontUserDetails.userID,
                        accessToken: response.jwtToken,
                        permissions: JSON.parse(response.frontUserDetails.permissions),
                        allowedRoutes: JSON.parse(response.frontUserDetails.allowedRoutes),
                        route: response.frontUserDetails.route,
                        companyMap: response.frontUserDetails.companyMap,
                        subColor: response.frontUserDetails.subColor,
                        logo: response.frontUserDetails.logo_url,
                        logo_mime: response.frontUserDetails.logo_mime,
                        mainColor: response.frontUserDetails.mainColor,
                    });
                } else {
                    dispatch({
                        type: authActions.LOGOUT,
                        isLogin: false,
                        userID: null,
                        accessToken: null,
                        permissions: null,
                        allowedRoutes: null,
                        route: null,
                        companyMap: null,
                        subColor: null,
                        logo: null,
                        logo_mime: null,
                        mainColor: null,
                    });
                }
            }, error => {
                return error.response;
            });
        }
    },
    regetJWTToken: (accessToken) => {
        return dispatch => {
            return regetJWTToken(accessToken).then(response => {
                if (response.success) {
                    dispatch({
                        type: authActions.REGETJWTTOKEN,
                        accessToken: response.jwtToken
                    });
                } else {
                    dispatch({
                        type: authActions.LOGOUT,
                        isLogin: false,
                        userID: null,
                        accessToken: null,
                        permissions: null,
                        allowedRoutes: null,
                        route: null,
                        companyMap: null,
                        subColor: null,
                        logo: null,
                        logo_mime: null,
                        mainColor: null
                    });
                }
            })
        };
    },
    verifyUsername: (email) => {
        return dispatch => {
            return verifyUsername(email).then(response => {
                if (response.success) {
                    dispatch({
                        type: authActions.FORGOTPASSWORDEMAIL,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: authActions.FORGOTPASSWORDEMAIL,
                        data: '',
                    });
                }
                return response;
            }, error => {
                return error.response;
            });
        }
    },
    sendResetPassword: (data) => {
        return dispatch => {
            return sendResetPassword(data).then(response => {
                return response;
            }, error => {
                return error.response;
            });
        }
    }
}

export default authActions