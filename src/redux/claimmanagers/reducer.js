
import cmActions from './actions'

const initState = {
    topDashboardData: [],
    claimsDates: [],
    topVisitTypes: [],
    topCompanyUtilization: [],
    topEmployeeSpending: [],
    topClinicUtilization: [],
    topDiagnosis: [],
    visitsByMonths: [],
    topClassifications: [],
    claimDetailsAndHistory: [],
    claimAllDetailsAndHistory: [],
    topProviders: []
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case cmActions.GetDashboard:

            return {
                ...state,
                topDashboardData: action.data
            }
        case cmActions.GetClaimsDates:
            return {
                ...state,
                claimsDates: action.data
            }
        case cmActions.GetTopVisitTypes:
            return {
                ...state,
                topVisitTypes: action.data
            }
        case cmActions.GetTopCompanyUtilization:
            return {
                ...state,
                topCompanyUtilization: action.data
            }
        case cmActions.GetTopEmployeeSpending:
            return {
                ...state,
                topEmployeeSpending: action.data
            }
        case cmActions.GetTopClinicUtilization:
            return {
                ...state,
                topClinicUtilization: action.data
            }
        case cmActions.GetTopDiagnosis:
            return {
                ...state,
                topDiagnosis: action.data
            }
        case cmActions.GetTopClassifications:
            return {
                ...state,
                topClassifications: action.data
            }
        case cmActions.GetVisitsByMonths:
            return {
                ...state,
                visitsByMonths: action.data
            }
        case cmActions.GetClaimDetailsAndHistory:
            return {
                ...state,
                claimDetailsAndHistory: action.data
            }
        case cmActions.GetAllClaimsDetailsAndHistory:
            return {
                ...state,
                claimAllDetailsAndHistory: action.data
            }
        case cmActions.GetCMTopProviders:
            return {
                ...state,
                topProviders: action.data
            }
        default:
            return state
    }
}