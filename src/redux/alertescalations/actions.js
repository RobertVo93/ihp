import { createAlertEscalation, deleteAlertEscalation, getAlertEscalationByID, getAllAlertEscalations, getUserAlertEscalations, updateAlertEscalation } from './api';

const alertEscalateActions = {
    GetAllAlertEscalations: "GetAllAlertEscalations",
    GetAlertEscalationByID: "GetAlertEscalationByID",
    GetUserAlertEscalations: "GetUserAlertEscalations",
    CreateAlertEscalation: "CreateAlertEscalation",

    getAllAlertEscalations: (userObject) => {
        return dispatch => {
            return getAllAlertEscalations(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: alertEscalateActions.GetAllAlertEscalations,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: alertEscalateActions.GetAllAlertEscalations,
                        data: []
                    });
                }
            })
        };
    },
    getAlertEscalationByID: (userObject, alertID) => {
        return dispatch => {
            return getAlertEscalationByID(userObject, alertID).then(response => {
                if (response.success) {
                    dispatch({
                        type: alertEscalateActions.GetAlertEscalationByID,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: alertEscalateActions.GetAlertEscalationByID,
                        data: null
                    });
                }
            });
        };
    },
    getUserAlertEscalations: (userObject, userID) => {
        return dispatch => {
            return getUserAlertEscalations(userObject, userID).then(response => {
                if (response.success) {
                    dispatch({
                        type: alertEscalateActions.GetUserAlertEscalations,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: alertEscalateActions.GetUserAlertEscalations,
                        data: []
                    });
                }
            });
        };
    },
    clearSelectedAlertEscalation: () => {
        return dispatch => {
            dispatch({
                type: alertEscalateActions.GetAlertEscalationByID,
                data: null
            });
        };
    },
    createAlertEscalation: (userObject, alertObject) => {
        return dispatch => {
            return createAlertEscalation(userObject, alertObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: alertEscalateActions.GetAlertEscalationByID,
                        data: response.data
                    });
                    return true;
                } else {
                    dispatch({
                        type: alertEscalateActions.GetAlertEscalationByID,
                        data: null
                    });
                    return false;
                }
            }, error => {
                return false;
            });
        };
    },
    updateAlertEscalation: (userObject, alertObject) => {
        return dispatch => {
            return updateAlertEscalation(userObject, alertObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: alertEscalateActions.GetAlertEscalationByID,
                        data: response.data
                    });
                    return true;
                } else {
                    dispatch({
                        type: alertEscalateActions.GetAlertEscalationByID,
                        data: null
                    });
                    return false;
                }
            }, error => {
                return false;
            });
        };
    },
    deleteAlertEscalation: (userObject, id) => {
        return dispatch => {
            return deleteAlertEscalation(userObject, id).then(response => {
                dispatch({
                    type: alertEscalateActions.GetAlertEscalationByID,
                    data: null
                });
                return response.success || false;
            }, error => {
                return false;
            });
        };
    }
}

export default alertEscalateActions