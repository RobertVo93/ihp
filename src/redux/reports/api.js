import { handleResponse, handleError } from "../api/apiUtils";

const axios = require("axios");
const rootURL =
  process.env.REACT_APP_API_ENDPOINT + "/api/v1/mssql_interface_reports";

export function getAllPolicies(userObject) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/getallpolicies",
    data: {},
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getHeadcount(userObject, cStrings) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/getheadcount",
    data: { companyIDs: cStrings },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS3OverviewCosts(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets3overviewcosts",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS4IPTopDiagnosis(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets4iptopdiagnosis",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS5OPStats(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets5opstats",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS7ChronicStats(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets7chronicstats",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS8ChronicIllness(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets8chronicillness",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS11IPTable(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets11iptable",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS12IPTopDiagnosis(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets12iptopdiagnosis",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS13IPTopProviders(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets13iptopproviders",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS14IPTopClaimants(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets14iptopclaimants",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS16OPSPTable(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets16opsptable",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS17OPSPEntity(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets17opspentity",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS18OPSPTopDiagnosis(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets18opsptopdiagnosis",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS19OPSPTopProviders(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets19opsptopproviders",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS20OPSPTopClaimants(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets20opsptopclaimants",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS22OPGPTable(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets22opgptable",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS23OPGPEntity(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets23opgpentity",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS24OPGPTopDiagnosis(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets24opgptopdiagnosis",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS25OPGPTopProviders(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets25opgptopproviders",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS26OPGPTopClaimants(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets26opgptopclaimants",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS27OPGPUtilization(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets27opgputilization",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS28OPSPUtilization(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets28opsputilization",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS29Chronicdemo(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets29chronicdemo",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS30PanelGpEntity(userObject, cStrings, dateTo, dateFrom) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets30panelgpbyentity",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getS31PanelGpRelationship(
  userObject,
  cStrings,
  dateTo,
  dateFrom
) {
  let headers = { Authorization: "Bearer " + userObject.accessToken };

  return axios({
    method: "post",
    url: rootURL + "/gets31panelgpbyrelationship",
    data: {
      companyIDs: cStrings,
      toDate: dateTo,
      fromDate: dateFrom
    },
    headers: headers
  })
    .then(handleResponse)
    .catch(handleError);
}
