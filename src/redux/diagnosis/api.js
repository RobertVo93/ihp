import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require('axios');
const rootURL = process.env.REACT_APP_API_ENDPOINT + "/api/v1/mssql_interface_diagnosis";

export function getDashboard(userObject, diagID) {

    logEvent("Diagnosis Get Dashboard", {diagnosisID: diagID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getdashboard",
		data: { diagnosisID: diagID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopClinics(userObject, diagID) {

    logEvent("Diagnosis Get Top Clinic", {diagnosisID: diagID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopclinics",
		data: { diagnosisID: diagID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopPatients(userObject, diagID) {

    logEvent("Diagnosis Get Top Patient", {diagnosisID: diagID})
    
	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettoppatients",
		data: { diagnosisID: diagID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}