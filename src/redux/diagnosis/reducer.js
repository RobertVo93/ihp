
import diagActions from './actions'

const initState = {
    viewingDiagnosisID: localStorage.getItem('view_diagnosis_id') ? localStorage.getItem('view_diagnosis_id') : null,
    diagnosisTopDashboard: [],
    diagnosisTopClinics: [],
    diagnosisTopPatients: []
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case diagActions.SetDiagnosisID:
            return {
                ...state,
                diagnosisTopDashboard: state.viewingDiagnosisID == action.data ? state.diagnosisTopDashboard : [],
                viewingDiagnosisID: action.data,

            }
        case diagActions.GetDashboard:
            return {
                ...state,
                diagnosisTopDashboard: action.data
            }
        case diagActions.GetTopClinics:
            return {
                ...state,
                diagnosisTopClinics: action.data
            }
        case diagActions.GetTopPatients:
            return {
                ...state,
                diagnosisTopPatients: action.data
            }
        default:
            return state
    }
}