import { getAllEscalations, confirmEscalation, getEscalationHistory, getEscalationFile, confirmReview } from './api';
var fileDownload = require('react-file-download');

const medActions = {
    GetAllEscalations: "GETALLESCALATIONS",
    ConfirmEscalation: "CONFIRMESCALATION",
    GetEscalationHistory: "GETESCALATIONHISTORY",
    GetEscalationFile: "GETESCALATIONFILE",
    ConfirmReview: "CONFIRMREVIEW",

    getAllEscalations: (userObject) => {
        return dispatch => {
            return getAllEscalations(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: medActions.GetAllEscalations,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: medActions.GetAllEscalations,
                        data: []
                    });
                }
            })
        };
    },
    confirmEscalationAction: (userObject, escalationObject) => {
        return dispatch => {
            return confirmEscalation(userObject, escalationObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: medActions.ConfirmEscalation,
                    });
                    escalationObject.cb(true, "Escalation Successful!");
                } else {
                    dispatch({
                        type: medActions.ConfirmEscalation,
                    });
                    escalationObject.cb(false, "Escalation Successful!");
                }
            })
        };
    },
    getEscalationHistory: (userObject, rNo) => {
        return dispatch => {
            return getEscalationHistory(userObject, rNo).then(response => {
                if (response.success) {
                    dispatch({
                        type: medActions.GetEscalationHistory,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: medActions.GetEscalationHistory,
                        data: response.data
                    });
                }
            })
        };
    },
    getEscalationFile: (userObject, fID, fileName, cT) => {
        return dispatch => {
            return getEscalationFile(userObject, fID, cT).then(response => {
                //alert(JSON.stringify(Object.keys(response)));
                //alert(typeof(response));
                //alert(response);
                let fileBlob = new Blob([response]);
                fileDownload(fileBlob, fileName);
                //window.open(response);
            })
        };
    },
    confirmReview: (userObject, rObj) => {
        return dispatch => {
            return confirmReview(userObject, rObj).then(response => {
                if (response.success) {
                    dispatch({
                        type: medActions.ConfirmReview,
                    });
                    rObj.cb(true, "Review Successful!");
                } else {
                    dispatch({
                        type: medActions.ConfirmReview,
                    });
                    rObj.cb(false, "Review Successful!");
                }
            })
        };
    },
}

export default medActions
