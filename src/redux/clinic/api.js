import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require("axios");
const rootURL =
  process.env.REACT_APP_API_ENDPOINT + "/api/v1/mssql_interface_clinic";

export function getDashboard(userObject, clinicID) {
    
  logEvent("Clinic Get Dashboard", {clinicID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/getdashboard",
    data: { clinicID: clinicID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getTopPatient(userObject, clinicID) {

    logEvent("Clinic Top Patient", {clinicID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gettoppatient",
    data: { clinicID: clinicID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getTopDiagnosis(userObject, clinicID) {

    logEvent("Clinic Top Diagnosis", {clinicID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gettopdiagnosis",
    data: { clinicID: clinicID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getAllVisits(userObject, clinicID) {

    logEvent("Clinic Get All Visit", {clinicID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/getallvisits",
    data: { clinicID: clinicID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getDrugsAndProcedures(userObject, Rocno) {

    logEvent("Clinic Get Dug And Procedure", {Rocno})

  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/getdrugsandproceures",
    data: { Rocno: Rocno },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getTopDoctors(userObject, clinicID) {

    logEvent("Clinic Top Doctors", {clinicID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };
  return axios({
    method: "post",
    url: rootURL + "/gettopdoctors",
    data: { clinicID: clinicID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getAllClaimsOfDoctorInClinic(
  userObject,
  clinicID,
  doctorValue
) {

    logEvent("Clinic Doctor All Claims", {clinicID, doctorValue})

  let headers = { Authorization: "Bearer " + userObject.accessToken };
  return axios({
    method: "post",
    url: rootURL + "/getdoctorallclaims",
    data: { clinicID: clinicID, doctorValue: doctorValue },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getTopCompanyVisit(userObject, clinicID) {

    logEvent("Clinic Get Top Company Visit", {clinicID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };
  return axios({
    method: "post",
    url: rootURL + "/gettopcompanyvisit",
    data: { clinicID: clinicID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getClinicProfile(userObject, clinicID) {

    logEvent("Clinic Get Clinic Profile", {clinicID})

  let headers = { Authorization: "Bearer " + userObject.accessToken };
  return axios({
    method: "post",
    url: rootURL + "/getclinicprofile",
    data: { clinicID: clinicID },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}