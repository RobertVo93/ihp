
import { arrayUnique } from 'helper/methods'
import compActions from './actions'

const initState = {
    viewingCompanyID: localStorage.getItem('view_company_id') ? localStorage.getItem('view_company_id') : null,
    companyTopDashboard: [],
    companyHeadcount: [],
    companyVisitType: [],
    companyTopEmployeeSpending: [],
    companyTopEmployeeMC: [],
    companyTopClinics: [],
    companyTopDiagnosis: [],
    companyTopDiagnosisMC: [],
    companyVisitsByMonths: [],
    companyProductivityDashboard: [],
    companyProductivityDemographics: [],
    companyProductivityMCOverMonths: [],
    companyProductivityTopEmployees: [],
    companyProductivityTopClinicHoppers: [],
    companyClaimsBreakdown: [],
    companyRelationsBreakdown: [],
    companyProfileDashboard: [],
    companyProfileDemographics: [],
    companyProfileRelations: [],
    companyProfileTopDiagnosis: [],
    companyProfileClassifications: [],
    companyProfileTopProviders: [],
    companyProfileTopEmployees: [],
    companyProfileVisitsByMonths: [],
    companyList: [],
    filteredCompanyCount: 0,
    companyProfile: {},
    companyGLStatisticsDashboard: {},
    companyGLStatisticsBreakdown: [],
    companyGLStatisticsDeclineGL: [],
    companyGLStatisticsOvermonthdGL: [],
    companyGLStatisticsTopHospitalsForGL: [],
    companyGLStatisticsDashboardByType: {},
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case compActions.SetCompanyID:
            return {
                ...state,
                companyTopDashboard: state.viewingCompanyID == action.data ? state.companyTopDashboard : [],
                viewingCompanyID: action.data,

            }
        case compActions.GetDashboard:
            return {
                ...state,
                companyTopDashboard: action.data
            }
        case compActions.GetCompanyHeadcount:
            return {
                ...state,
                companyHeadcount: action.data
            }
        case compActions.GetCompanyVisitType:
            return {
                ...state,
                companyVisitType: action.data
            }
        case compActions.GetCompanyTopEmployeeSpending:
            return {
                ...state,
                companyTopEmployeeSpending: action.data[0]
            }
        case compActions.GetCompanyTopEmployeeMC:
            return {
                ...state,
                companyTopEmployeeMC: action.data
            }
        case compActions.GetCompanyTopClinics:
            return {
                ...state,
                companyTopClinics: action.data
            }
        case compActions.GetCompanyTopDiagnosis:
            return {
                ...state,
                companyTopDiagnosis: action.data[0]
            }
        case compActions.GetCompanyTopDiagnosisMC:
            return {
                ...state,
                companyTopDiagnosisMC: action.data[0]
            }
        case compActions.GetCompanyVisitsByMonths:
            return {
                ...state,
                companyVisitsByMonths: action.data
            }
        case compActions.GetCompanyProfileDashboard:
            return {
                ...state,
                companyProfileDashboard: action.data
            }
        case compActions.GetCompanyProfileDemographics:
            return {
                ...state,
                companyProfileDemographics: action.data
            }
        case compActions.GetCompanyProfileRelations:
            return {
                ...state,
                companyProfileRelations: action.data
            }
        case compActions.GetCompanyProfileTopDiagnosis:
            return {
                ...state,
                companyProfileTopDiagnosis: action.data
            }
        case compActions.GetCompanyProfileClassifications:
            return {
                ...state,
                companyProfileClassifications: action.data
            }
        case compActions.GetCompanyProfileTopProviders:
            return {
                ...state,
                companyProfileTopProviders: action.data
            }
        case compActions.GetCompanyProfileTopEmployees:
            return {
                ...state,
                companyProfileTopEmployees: action.data
            }
        case compActions.GetCompanyProfileVisitsByMonths:
            return {
                ...state,
                companyProfileVisitsByMonths: action.data
            }
        case compActions.GetCompanyProductivityDashboard:
            return {
                ...state,
                companyProductivityDashboard: action.data
            }
        case compActions.GetCompanyProductivityDemographics:
            return {
                ...state,
                companyProductivityDemographics: action.data
            }
        case compActions.GetCompanyProductivityMCOverMonths:
            return {
                ...state,
                companyProductivityMCOverMonths: action.data
            }
        case compActions.GetCompanyProductivityTopEmployees:
            return {
                ...state,
                companyProductivityTopEmployees: action.data
            }
        case compActions.GetCompanyProductivityTopClinicHoppers:
            return {
                ...state,
                companyProductivityTopClinicHoppers: action.data
            }
        case compActions.GetCompanyClaimsBreakdown:
            return {
                ...state,
                companyClaimsBreakdown: action.data
            }
        case compActions.GetCompanyRelationsBreakdown:
            return {
                ...state,
                companyRelationsBreakdown: action.data
            }
        case compActions.GetListCompanyByFilter:
            return {
                ...state,
                companyList: action.data
            }
        case compActions.LoadmoreCompanyList:
            return {
                ...state,
                companyList: arrayUnique(state.companyList.concat(action.data))
            }
        case compActions.GetTotalFilteredCompany:
            return {
                ...state,
                filteredCompanyCount: action.data
            }
        case compActions.GetCompanyProfile:
            return {
                ...state,
                companyProfile: action.data || {}
            }
        case compActions.GetCompanyGLDashboard:
            return {
                ...state,
                companyGLStatisticsDashboard: action.data,
            }
        case compActions.GetCompanyGLBreakdown:
            return {
                ...state,
                companyGLStatisticsBreakdown: action.data,
            }
        case compActions.GetCompanyDeclineGL:
            return {
                ...state,
                companyGLStatisticsDeclineGL: action.data,
            }
        case compActions.GetCompanyGLOvermonth:
            return {
                ...state,
                companyGLStatisticsOvermonthdGL: action.data,
            }
        case compActions.GetCompanyTopHospitalsForGL:
            return {
                ...state,
                companyGLStatisticsTopHospitalsForGL: action.data,
            }
        case compActions.GetCompanyGLDashboardByType:
            return {
                ...state,
                companyGLStatisticsDashboardByType: action.data,
            }
        default:
            return state
    }
}