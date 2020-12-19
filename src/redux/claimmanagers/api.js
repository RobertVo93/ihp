import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require('axios');
const rootURL = process.env.REACT_APP_API_ENDPOINT + "/api/v1/mssql_interface_cm";

export function getDashboard(userObject) {

    logEvent("Claim Get Dashboard")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getdashboard",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getClaimsDates(userObject) {

    logEvent("Claim Get Dates")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getclaimdates",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopVisitTypes(userObject) {

    logEvent("Claim Get Top Visit Type")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopvisittype",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopCompanyUtilization(userObject) {

    logEvent("Claim Get Top Company")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopcompanyutilization",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopEmployeeSpending(userObject) {

    logEvent("Claim Get Top Employee")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopemployeespending",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopClinicUtilization(userObject) {

    logEvent("Claim Get Top Clinic")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopclinicutilization",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopDiagnosis(userObject) {

    logEvent("Claim Get Top Diagnosis")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopdiagnosis",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopClassifications(userObject) {

    logEvent("Claim Get Top Classifications")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopclassifications",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getVisitsByMonths(userObject) {

    logEvent("Claim Get Visit By Month")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getvisitsbymonths",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getClaimsDetailsAndHistory(userObject, cID) {

    logEvent("Claim Get Detail And History", { claimID: cID })

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getclaimdetailshistory",
		data: { claimID: cID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getAllClaimsDetailsAndHistory(userObject, cID) {

    logEvent("Claim Get All Detail And History", {claimID: cID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getallclaimsdetailhistory",
		data: { claimID: cID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getCMAllProviders(userObject) {

    logEvent("Claim Get All Providers")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken };

	return axios({
		method: 'post',
		url: rootURL + "/getalltopproviders",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}