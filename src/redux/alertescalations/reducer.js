import alertEscalateActions from './actions'

const initState = {
    allAlertEscalations: [],
    userAlertEscalations: [],
    selectedAlertEscalation: null
}

export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case alertEscalateActions.GetAllAlertEscalations:
            return {
                ...state,
                allAlertEscalations: action.data
            }
        case alertEscalateActions.GetAlertEscalationByID:
            return {
                ...state,
                selectedAlertEscalation: action.data
            }
        case alertEscalateActions.GetUserAlertEscalations:
            return {
                ...state,
                userAlertEscalations: action.data
            }
        default:
            return state
    }
}