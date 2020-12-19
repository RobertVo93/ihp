import { logEvent } from "helper/firebaseSetEvent";
import { handleResponse, handleError } from "../api/apiUtils";

const axios = require('axios');
const rootURL = process.env.REACT_APP_API_ENDPOINT + "/api/v1/mssql_interface_company";

//Overview
export function getDashboard(userObject, coyID) {

    logEvent("Company Get Dashboard", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getdashboard",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getHeadcount(userObject, coyID) {

    logEvent("Company Get Head Count", {coyID})
    
	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getheadcount",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getVisitType(userObject, coyID) {

    logEvent("Company Get Visit Type", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getvisittype",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopEmployeeSpending(userObject, coyID) {

    logEvent("Company Get Top Employee Spending", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopemployeespending",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopEmployeeMC(userObject, coyID) {

    logEvent("Company Get Top Employee MC", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopemployeemc",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopClinics(userObject, coyID) {

    logEvent("Company Get Top Clinic", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopclinicutilization",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopDiagnosis(userObject, coyID) {

    logEvent("Company Get Top Diagnosis", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopdiagnosis",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getTopDiagnosisMC(userObject, coyID) {

    logEvent("Company Get Top Diagnosis MC", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/gettopdiagnosismc",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getVisitsByMonths(userObject, coyID) {

    logEvent("Company Get Visit By Months", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getvisitsbymonths",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

//Productivity
export function getProductivityDashboard(userObject, coyID) {

    logEvent("Company Get Productivity Dashboard", {coyID})

    let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/productivity/getdashboard",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProductivityDemographics(userObject, coyID) {

    logEvent("Company Get Productivity Demographics", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/productivity/getdemographics",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProductivityMCOverMonths(userObject, coyID) {

    logEvent("Company Get Productivity MCOverMonths", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/productivity/getproductivitybymonths",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProductivityTopEmployees(userObject, coyID) {

    logEvent("Company Get Productivity TopEmployees", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/productivity/gettopemployeesmc",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProductivityTopClinicHoppers(userObject, coyID) {

    logEvent("Company Get Productivity Top Clinic Hoppers", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/productivity/gettopclinichoppers",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

//Claims Breakdown
export function getClaimsBreakdown(userObject, coyID) {

    logEvent("Company Get CLaims Breakdown", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/breakdown/getclaimsbreakdown",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getRelationsBreakdown(userObject, coyID) {

    logEvent("Company Get Relation Breakdown", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/breakdown/getclaimsrelationsbreakdown",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}


//Medical Profiles
//Inpatient
export function getProfileInpatientDashboard(userObject, coyID) {

    logEvent("Company Get Profile Inpatient", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/inpatient/getdashboard",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileInpatientDemographics(userObject, coyID) {

    logEvent("Company Get Profile Inpatient Demographics", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/inpatient/getdemographics",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileInpatientRelationsSpendings(userObject, coyID) {

    logEvent("Company Get Profile Inpatient Relation Spending", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/inpatient/getrelationspending",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileInpatientTopDiagnosis(userObject, coyID) {

    logEvent("Company Get Profile Inpatient Top Diagnosis", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/inpatient/gettopdiagnosis",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileInpatientClassifications(userObject, coyID) {

    logEvent("Company Get Profile Inpatient Classifications", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/inpatient/getclassifications",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileInpatientTopProviders(userObject, coyID) {

    logEvent("Company Get Profile Inpatient Top Providers", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/inpatient/gettopproviders",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileInpatientTopEmployees(userObject, coyID) {

    logEvent("Company Get Profile Inpatient Top Employee", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/inpatient/gettopemployees",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileInpatientVisitsByMonths(userObject, coyID) {

    logEvent("Company Get Profile Inpatient Visit By Month", {coyID})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/inpatient/getvisitsbymonths",
		data: { companyID: coyID },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

//Outpatient
export function getProfileOutpatientDashboard(userObject, coyID, vType) {

    logEvent("Company Get Profile Outpatient", {coyID, vType})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/outpatient/getdashboard",
		data: { companyID: coyID, visitType: vType },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileOutpatientDemographics(userObject, coyID, vType) {

    logEvent("Company Get Profile Outpatient Demographics", {coyID, vType})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/outpatient/getdemographics",
		data: { companyID: coyID, visitType: vType },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileOutpatientRelationsSpendings(userObject, coyID, vType) {

    logEvent("Company Get Profile Outpatient Relations Spendings", {coyID, vType})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/outpatient/getrelationspending",
		data: { companyID: coyID, visitType: vType },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileOutpatientTopDiagnosis(userObject, coyID, vType) {

    logEvent("Company Get Profile Outpatient Top Diagnosis", {coyID, vType})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/outpatient/gettopdiagnosis",
		data: { companyID: coyID, visitType: vType },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileOutpatientClassifications(userObject, coyID, vType) {

    logEvent("Company Get Profile Outpatient Classifications", {coyID, vType})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/outpatient/getclassifications",
		data: { companyID: coyID, visitType: vType },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileOutpatientTopProviders(userObject, coyID, vType) {

    logEvent("Company Get Profile Outpatient Top Providers", {coyID, vType})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/outpatient/gettopproviders",
		data: { companyID: coyID, visitType: vType },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileOutpatientTopEmployees(userObject, coyID, vType) {

    logEvent("Company Get Profile Outpatient Top Employees", {coyID, vType})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/outpatient/gettopemployees",
		data: { companyID: coyID, visitType: vType },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getProfileOutpatientVisitsByMonths(userObject, coyID, vType) {

    logEvent("Company Get Profile Outpatient Visits By Months", {coyID, vType})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/profiles/outpatient/getvisitsbymonths",
		data: { companyID: coyID, visitType: vType },
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getListCompanyByFilter(userObject, filterObject) {

    logEvent("Company Get List Company By Filter", {filterObject})

	let headers = { 'Authorization': 'Bearer ' + userObject.accessToken }

	return axios({
		method: 'post',
		url: rootURL + "/getlistcompanybyfilter",
		data: {
			skip: filterObject.skip,
			take: filterObject.take,
			searchKey: filterObject.searchKey,
			sortBy: filterObject.sortBy
		},
		headers: headers
	}).then(handleResponse).catch(handleError);
}

export function getCompanyProfile(userObject, companyID) {

    logEvent("Company Get Profile", {companyID})

	let headers = { Authorization: "Bearer " + userObject.accessToken };
	return axios({
		method: "post",
		url: rootURL + "/getcompanyprofile",
		data: { companyID: companyID },
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getCompanyGLDashboard(userObject, companyID) {

    logEvent("Company Get GL Dashboard", {companyID})

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/glstatistic/getdashboard",
		data: { companyID: companyID },
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getCompanyGLBreakdown(userObject, companyID) {

    logEvent("Company Get GL Breakdown", {companyID})

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/glstatistic/getglbreakdown",
		data: { companyID: companyID },
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getCompanyDeclineGL(userObject, companyID) {

    logEvent("Company Get GL Decline", {companyID})

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/glstatistic/getdeclinegl",
		data: { companyID: companyID },
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getCompanyTopHospitalsForGL(userObject, companyID, GLType) {

    logEvent("Company Get Top Hospitals For GL", {companyID, GLType})

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/glstatistic/gettophospitals",
		data: {
			companyID: companyID,
			GLType: GLType
		},
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}

export function getCompanyGLOvermonth(userObject, companyID, GLType) {

    logEvent("Company Get GL Overmonth", {companyID})

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/glstatistic/getglovermonth",
		data: {
			companyID: companyID,
			GLType: GLType
		},
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}


export function getCompanyGLDashboardByType(userObject, companyID, GLType) {

    logEvent("Company Get GL Dashboard By Type", {companyID, GLType})

	let headers = { Authorization: "Bearer " + userObject.accessToken };

	return axios({
		method: "post",
		url: rootURL + "/glstatistic/getdashboardbytype",
		data: {
			companyID: companyID,
			GLType: GLType
		},
		headers: headers
	})
		.then(handleResponse)
		.catch(handleError);
}
