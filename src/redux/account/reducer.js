import userActions from "./actions"

const initState = {
    userInfo: [],
    resetInfo: null,
    labelSettings: [],
    newFeatures: null,
    roles: []
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case userActions.GetUserInfo:
            return {
                ...state,
                userInfo: action.data
            }
        case userActions.SetResetToken:
            return {
                ...state,
                resetInfo: action.data.length ? action.data[0] : null
            }
        case userActions.GetLabelSettings:
            return {
                ...state,
                labelSettings: action.data
            }
        case userActions.GetNewVersionFeatures:
            return {
                ...state,
                newFeatures: action.data
            }
        case userActions.GetAllRoles:
            return {
                ...state,
                roles: action.data
            }
        default:
            return state
    }
}