import { handleResponse, handleError } from "../api/apiUtils";
import sha256 from "crypto-js/sha256";
import firebase from 'firebase';
import { logEvent } from "helper/firebaseSetEvent";
const axios = require('axios');
const rootURL = process.env.REACT_APP_API_ENDPOINT + "/api/v1/user";

export function getUserInfo(userObject) {

    logEvent("Get Users Info")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'get',
		url: rootURL + "/account/management/getinfo",
		headers
	}).then(handleResponse).catch(handleError);
}

export function updateUserInfo(userObject, data) {

    logEvent("Update User Info", {user_id: data.UserID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'patch',
		url: rootURL + "/account/management/updateaccount",
		data,
		headers
	}).then(handleResponse).catch(handleError);
}


export function uploadLogo(data) {
	return axios({
		method: 'post',
		url: rootURL + "/upload",
		data,
	})
}

export function suspendUser(userObject, data) {

    logEvent("Suspend User Info", {user_id: data.UserID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }
	return axios({
		method: 'patch',
		url: rootURL + "/account/management/suspendaccount",
		data,
		headers
	}).then(handleResponse).catch(handleError);
}

export function checkResetPassword(data) {
	return axios({
		method: 'post',
		url: rootURL + "/account/management/checkresetpassword",
		data,
	}).then(handleResponse).catch(handleError);
}

export function updatePassword(data) {

    logEvent("Update User Password")

	const newData = {
		password: sha256(data.password + process.env.REACT_APP_PASSWORD_SALT).toString()
	}

	return axios({
		method: 'patch',
		url: rootURL + "/account/management/updatepassword",
		data: newData,
	})
}

export function getRoles(userObject) {

    logEvent("Get Roles")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }
	return axios({
		method: 'get',
		url: rootURL + "/account/management/getroles",
		headers
	}).then(handleResponse).catch(handleError);
}

export function createRole(userObject, data) {

    logEvent("Create Role")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }
	return axios({
		method: 'post',
		url: rootURL + "/account/management/createrole",
		data,
		headers
	})
}

export function updateRole(userObject, data) {

    logEvent("Update User Role", {user_role: data.RoleID})
    
	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }
	return axios({
		method: 'patch',
		url: rootURL + "/account/management/updaterole",
		data,
		headers
	})
}

export function addUser(userObject, data) {

    logEvent("Add User")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }
	return axios({
		method: 'post',
		url: rootURL + "/account/management/adduser",
		data,
		headers
	})
}

export function createNewPassword(data) {

    logEvent("Create New User Password")

	const newData = {
		password: sha256(data.password + process.env.REACT_APP_PASSWORD_SALT).toString()
	}

	return axios({
		method: 'patch',
		url: rootURL + "/account/management/createnewpassword",
		data: newData,
	})
}

export function getLabelSettings(userObject) {

    logEvent("Get Label Settings")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'get',
		url: rootURL + "/getwhitelabelsettings",
		headers
	}).then(handleResponse).catch(handleError);
}

export function updateLabelSettings(userObject, data) {

    logEvent("Update Label Settings", {label_id: data.id})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }
	return axios({
		method: 'patch',
		url: rootURL + "/updatewhitelabelsettings",
		data,
		headers
	})
}

export function createwhitelabelsettings(userObject, data) {

    logEvent("Create Label Settings")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }
	return axios({
		method: 'post',
		url: rootURL + "/createwhitelabelsettings",
		data,
		headers
	})
}

export function getNewVersionFeatures(userObject) {
	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'get',
		url: rootURL + "/getnewversionfeatures",
		headers
	}).then(handleResponse).catch(handleError);
}

export function updateUserNotifyVersion(userObject) {
	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/updateusernotifyversion",
		data: {},
		headers
	}).then(handleResponse).catch(handleError);
}








