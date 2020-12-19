import { getDashboard, getLiveGrowth, getRecentCompanies, getTopPerformingBrokers } from './api';

const amActions = {
    GetDashboard: 'GETDASHBORAD',
    GetLiveGrowth: 'GETLIVEGROWTH',
    GetRecentCompanies: 'GETRECENTCOMPANIES',
    GetTopBrokers: 'GETTOPBROKERS',

    getDashboard: (userObject) => {
        return dispatch => {
            return getDashboard(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: amActions.GetDashboard,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: amActions.GetDashboard,
                        data: []
                    });
                }
            })
        };
    },
    getLiveGrowth: (userObject) => {
        return dispatch => {
            return getLiveGrowth(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: amActions.GetLiveGrowth,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: amActions.GetLiveGrowth,
                        data: []
                    });
                }
            })
        };
    },
    getRecentCompanies: (userObject) => {
        return dispatch => {
            return getRecentCompanies(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: amActions.GetRecentCompanies,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: amActions.GetRecentCompanies,
                        data: []
                    });
                }
            })
        };
    },
    getTopBrokers: (userObject) => {
        return dispatch => {
            return getTopPerformingBrokers(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: amActions.GetTopBrokers,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: amActions.GetTopBrokers,
                        data: []
                    });
                }
            })
        };
    },
}

export default amActions