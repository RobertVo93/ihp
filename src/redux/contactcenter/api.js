import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require('axios');
const rootURL = process.env.REACT_APP_API_ENDPOINT + "/api/v1/contact_center";

export function getAllOrders(userObject) {

    logEvent("ContactCenter Get All Orders")

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getallorders",
		data: {},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getPatientDetails(userObject, pNRIC) {

    logEvent("ContactCenter Get Patient Details", {patientNRIC: pNRIC})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/checkpatientdetails",
		data: { patientNRIC: pNRIC },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function createUnderwritingOrder(userObject, uwObject) {

    logEvent("ContactCenter Create Under Writing Order", {uwObject})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/createunderwritingorder",
		data: uwObject,
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function createCallLog(userObject, clObject) {

    logEvent("ContactCenter Create Call Log", {clObject})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/createcalllog",
		data: clObject,
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function editOrder(userObject, eObject) {

    logEvent("ContactCenter Edit Order", {eObject})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/editorder",
		data: eObject,
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function closeOrder(userObject, oID) {

    logEvent("ContactCenter Close Order", {orderID: oID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/closeorder",
		data: { orderID: oID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function cancelOrder(userObject, oObj) {

    logEvent("ContactCenter Cancel Order", {oObj})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/cancelorder",
		data: oObj,
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getOrderDetails(userObject, oID) {

    logEvent("ContactCenter Get Order Detail", {orderID: oID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getorderdetails",
		data: { orderID: oID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}