
import patActions from './actions'

const initState = {
    viewingPatientID: localStorage.getItem('view_patient_id') ? localStorage.getItem('view_patient_id') : null,
    patientTopDashboard: [],
    patientTopDiagnosis: [],
    patientVisits: [],
    patientTopClinics: [],
    patientVisitsByMonths: [],
    patientVisitTimeline: []
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case patActions.SetPatientID:
            return {
                ...state,
                patientTopDashboard: state.viewingPatientID == action.data ? state.patientTopDashboard : [],
                viewingPatientID: action.data,

            }
        case patActions.GetDashboard:
            return {
                ...state,
                patientTopDashboard: action.data
            }
        case patActions.GetTopDiagnosis:
            return {
                ...state,
                patientTopDiagnosis: action.data
            }
        case patActions.GetAllVisits:
            return {
                ...state,
                patientVisits: action.data
            }
        case patActions.GetTopClinics:
            return {
                ...state,
                patientTopClinics: action.data
            }
        case patActions.GetVisitsByMonths:
            return {
                ...state,
                patientVisitsByMonths: action.data
            }
        case patActions.GetPatientTimeline:
            return {
                ...state,
                patientVisitTimeline: action.data
            }
        default:
            return state
    }
}