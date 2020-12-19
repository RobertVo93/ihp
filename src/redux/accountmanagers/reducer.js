
import amActions from './actions'

const initState = {
    topDashboardData: [],
    liveGrowthData: [],
    recentCompaniesData: [],
    topBrokers: []
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case amActions.GetDashboard:
            return {
                ...state,
                topDashboardData: action.data
            }
        case amActions.GetLiveGrowth:
            return {
                ...state,
                liveGrowthData: action.data
            }
        case amActions.GetRecentCompanies:
            return {
                ...state,
                recentCompaniesData: action.data
            }
        case amActions.GetTopBrokers:
            return {
                ...state,
                topBrokers: action.data
            }
        default:
            return state
    }
}