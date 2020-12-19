
import ccActions from './actions'

const initState = {
    allOrders: [],
    orderDetails: {}
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case ccActions.GetAllOrders:
            return {
                ...state,
                allOrders: action.data

            }
        case ccActions.GetOrderDetails:
            return {
                ...state,
                orderDetails: action.data
            }
        default:
            return state
    }
}