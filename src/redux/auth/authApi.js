import {
	handleResponse,
	handleError,
	basicAuth
} from "../api/apiUtils";
import sha256 from "crypto-js/sha256";
import {
	apiConfig,
	commonAPI
} from "redux/api/common-api";

const rootURL = process.env.REACT_APP_API_ENDPOINT + "/api/v1/user";

/**
 * API Login
 * @param {*} authObject 
 */
export function authLogin(authObject) {
	apiConfig.headers.Authorization = "Basic " + basicAuth;

	return commonAPI.post(
		`${rootURL}/login`, {
		remember: authObject.remember,
		username: authObject.username,
		password: sha256(
			authObject.password + process.env.REACT_APP_PASSWORD_SALT
		).toString()
	},
		apiConfig)
		.then(handleResponse)
		.catch(handleError);
}

/**
 * API: resend OTP to login user's email
 */
export function resendOTP() {
	apiConfig.headers.Authorization = "Basic " + basicAuth;

	return commonAPI.post(
		`${rootURL}/generateotp`, {},
		apiConfig)
		.then(handleResponse)
		.catch(handleError);
}

/**
 * API: verify OTP token
 * @param {*} otpToken 
 */
export function verifyOTP(otpToken) {
	apiConfig.headers.Authorization = "Basic " + basicAuth;

	return commonAPI.post(
		`${rootURL}/verifyotp`, {
		otpToken: otpToken
	},
		apiConfig)
		.then(handleResponse)
		.catch(handleError);
}

/**
 * API: reget JWT Token
 * @param {*} accessToken 
 */
export function regetJWTToken(accessToken) {
	apiConfig.headers.Authorization = "Basic " + basicAuth;

	return commonAPI.post(
		`${rootURL}/regetjwttoken`, {},
		apiConfig)
		.then(handleResponse)
		.catch(handleError);
}

/**
 * API: verify User Name
 * @param {*} email 
 */
export function verifyUsername(email) {
	apiConfig.headers.Authorization = "Basic " + basicAuth;

	return commonAPI.post(
		`${rootURL}/verifyusername`, { username: email },
		apiConfig)
		.then(handleResponse)
		.catch(handleError);
}

/**
 * API: Send reset password
 * @param {*} data 
 */
export function sendResetPassword(data) {

	apiConfig.headers.Authorization = "Basic " + basicAuth;

	return commonAPI.post(
		`${rootURL}/resetpassword`, data,
		apiConfig)
		.then(handleResponse)
		.catch(handleError);
}