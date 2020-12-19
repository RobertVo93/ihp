import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require("axios");
const rootURL =
	process.env.REACT_APP_API_ENDPOINT + "/api/v1/medical_escalations";

export function getAllEscalations(userObject, pID) {

    logEvent("Medicalescalation Get All Escalation")

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/getallescalations",
		data: {},
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function confirmEscalation(userObject, escalationObject) {

    logEvent("Medicalescalation Confirm Escalation", {escalationObject})

	let headers = {
		Authorization: "Bearer " + userObject.accessToken,
		"Content-Type": "multipart/form-data"
	};
	var bodyFormData = new FormData();
	bodyFormData.append("otherComments", escalationObject.otherComments);
	bodyFormData.append("escalationID", escalationObject.escID);
	bodyFormData.append("treatingDoctors", escalationObject.treatingDoctors);
	bodyFormData.append(
		"underlyingConditions",
		escalationObject.underlyingConditions
	);
	bodyFormData.append("fileTypes", JSON.stringify(escalationObject.fileTypes));
	bodyFormData.append("rocNo", escalationObject.rocNo);
	bodyFormData.append("escalating", escalationObject.escalating);
	bodyFormData.append("patientName", escalationObject.patientName);

	for (var i = 0; i < escalationObject.files.length; i++) {
		bodyFormData.append("files[]", escalationObject.files[i]);
	}

	return axios({
		method: "post",
		url: rootURL + "/sendconfirmationescalation",
		data: bodyFormData,
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function confirmReview(userObject, reviewObject) {

    logEvent("Medicalescalation Confirm Review", {reviewObject})

	let headers = {
		Authorization: "Bearer " + userObject.accessToken,
		"Content-Type": "multipart/form-data"
	};
	var bodyFormData = new FormData();
	bodyFormData.append("otherComments", reviewObject.otherComments);
	bodyFormData.append("escalationID", reviewObject.escID);
	bodyFormData.append("fileTypes", JSON.stringify(reviewObject.fileTypes));
	bodyFormData.append("rocNo", reviewObject.rocNo);
	bodyFormData.append("reviewType", reviewObject.reviewType);
	bodyFormData.append("patientName", reviewObject.patientName);

	for (var i = 0; i < reviewObject.files.length; i++) {
		bodyFormData.append("files[]", reviewObject.files[i]);
	}

	return axios({
		method: "post",
		url: rootURL + "/confirmreview",
		data: bodyFormData,
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getEscalationHistory(userObject, rNo) {

    logEvent("Medicalescalation Get Escalation History", {rocNo: rNo})

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/getescalationhistory",
		data: { rocNo: rNo },
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getEscalationFile(userObject, fID, cT) {

    logEvent("Medicalescalation Get Escalation File", {fileID: fID})

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/getfile",
		data: { fileID: fID },
		headers: headers,
		responseType: "arraybuffer"
	})
		.then(handleResponse)
		.catch(handleError);
}
