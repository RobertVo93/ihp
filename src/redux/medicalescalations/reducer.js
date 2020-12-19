
import medActions from './actions'

const initState = {
    allEscalations: [],
    escalationHistory: []
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case medActions.GetAllEscalations:
            return {
                ...state,
                allEscalations: action.data

            }
        case medActions.ConfirmEscalation:
            return {
                ...state,
            }
        case medActions.GetEscalationHistory:
            return {
                ...state,
                escalationHistory: action.data
            }
        default:
            return state
    }
}