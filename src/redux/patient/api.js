import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require("axios");
const rootURL =
  process.env.REACT_APP_API_ENDPOINT + "/api/v1/mssql_interface_patient";

export function getDashboard(userObject, pID) {

    logEvent("Patient Get Dashboard", {patientID: pID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/getdashboard",
    data: { patientID: pID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getTopDiagnosis(userObject, pID) {

    logEvent("Patient Get Top Diagnosis", {patientID: pID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };
    
  return axios({
    method: "post",
    url: rootURL + "/gettopdiagnosis",
    data: { patientID: pID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getAllVisits(userObject, pID) {

    logEvent("Patient Get All Visit", {patientID: pID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/getallvisits",
    data: { patientID: pID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getTopClinics(userObject, pID) {

    logEvent("Patient Get Top Clinic", {patientID: pID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gettopclinics",
    data: { patientID: pID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getVisitsByMonths(userObject, pID) {

    logEvent("Patient Get Visits By Month", {patientID: pID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/getvisitsbymonths",
    data: { patientID: pID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getPatientTimeline(userObject, pID) {

    logEvent("Patient Get Patient Timeline", {patientID: pID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gettimeline",
    data: { patientID: pID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}
