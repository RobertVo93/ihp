import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require("axios");
const rootURL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/alert_escalations`;

/**
 * API: Get all alert escalations
 * @param {*} userObject 
 */
export function getAllAlertEscalations(userObject) {

    logEvent("Get Alert Escalation")

    let headers = { Authorization: `Bearer ${userObject.accessToken}` };

    return axios({
            method: "get",
            url: rootURL,
            headers: headers
        })
        .then(handleResponse)
        .catch(handleError);
}

/**
 * API: Get alert escalation by alertID
 * @param {*} userObject 
 * @param {*} alertID 
 */
export function getAlertEscalationByID(userObject, alertID) {
    
    logEvent("Get Alert Escalation", {alertID})

    let headers = { Authorization: `Bearer ${userObject.accessToken}` };

    return axios({
            method: "get",
            url: `${rootURL}/${alertID}`,
            headers: headers
        })
        .then(handleResponse)
        .catch(handleError);
}

/**
 * API: Get alert escalations of a user
 * @param {*} userObject 
 * @param {*} userID user id
 */
export function getUserAlertEscalations(userObject, userID) {

    logEvent("Get User Alert Escalation", {userID})

    let headers = { Authorization: `Bearer ${userObject.accessToken}` };

    return axios({
            method: "get",
            url: `${rootURL}/getbyuser/${userID}`,
            headers: headers
        })
        .then(handleResponse)
        .catch(handleError);
}

/**
 * API: Create a new alert escalation
 * @param {*} userObject 
 * @param {*} alertObject 
 */
export function createAlertEscalation(userObject, alertObject) {

    logEvent("Create Alert Escalation")

    let headers = { Authorization: `Bearer ${userObject.accessToken}` };

    return axios({
            method: "post",
            url: rootURL,
            data: {
                alertWhen: alertObject.AlertWhen,
                specificCompany: alertObject.SpecificCompany,
                specificMember: alertObject.SpecificMember,
                exceeds: alertObject.Exceeds,
                worthOf: alertObject.WorthOf,
                ina: alertObject.InA
            },
            headers: headers
        })
        .then(handleResponse)
        .catch(handleError);
}

/**
 * API: Update the selected Alert Escalation
 * @param {*} userObject 
 * @param {*} alertObject new Alert Object
 */
export function updateAlertEscalation(userObject, alertObject) {

    logEvent("Update Alert Escalation")

    let headers = { Authorization: `Bearer ${userObject.accessToken}` };

    return axios({
            method: "put",
            url: rootURL,
            data: {
                id: alertObject.ID,
                defID: alertObject.DefID,
                alertWhen: alertObject.AlertWhen,
                specificCompany: alertObject.SpecificCompany,
                specificMember: alertObject.SpecificMember,
                exceeds: alertObject.Exceeds,
                worthOf: alertObject.WorthOf,
                ina: alertObject.InA
            },
            headers: headers
        })
        .then(handleResponse)
        .catch(handleError);
}

/**
 * API: Delete the selected Alert Escalation
 * @param {*} userObject 
 * @param {*} id alert ID: table user_alert_escalations.ID in MySQL
 */
export function deleteAlertEscalation(userObject, id) {

    logEvent("Delete Alert Escalation" ,{alertID: id})

    let headers = { Authorization: `Bearer ${userObject.accessToken}` };

    return axios({
            method: "delete",
            url: rootURL,
            data: { id: id },
            headers: headers
        })
        .then(handleResponse)
        .catch(handleError);
}