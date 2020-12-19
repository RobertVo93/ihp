import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require('axios');
const rootURL = process.env.REACT_APP_API_ENDPOINT + "/api/v1/mssql_interface_am";

export function getDashboard(userObject) {

    logEvent("Get Dashboad Manager")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getdashboard",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getLiveGrowth(userObject) {

    logEvent("Get Live Growth")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getlivesgrowth",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getRecentCompanies(userObject) {

    logEvent("Get Recent Company")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getrecentcompanies",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopPerformingBrokers(userObject) {

    logEvent("Get Top Brokers")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopbrokers",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}