import { getAllOrders, getPatientDetails, createUnderwritingOrder, createCallLog, editOrder, closeOrder, cancelOrder, getOrderDetails } from './api';
var fileDownload = require('react-file-download');

const ccActions = {
    GetAllOrders: "GETALLUNDERWRITINGORDERS",
    GetPatientDetails: "GETPATIENTDETAILSORDERS",
    CreateUnderwritingOrder: "CREATEUNDERWRITINGORDER",
    CreateCallLog: "CREATECALLLOG",
    EditOrder: "EDITORDER",
    CloseOrder: "CLOSEORDER",
    CancelOrder: "CANCELORDER",
    GetOrderDetails: "GETORDERDETAILS",

    getAllOrders: (userObject) => {
        return dispatch => {
            return getAllOrders(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: ccActions.GetAllOrders,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: ccActions.GetAllOrders,
                        data: []
                    });
                }
            })
        };
    },
    getPatientDetails: (userObject, pNRIC, patientCB) => {
        return dispatch => {
            return getPatientDetails(userObject, pNRIC).then(response => {
                if (response.success) {
                    dispatch({
                        type: ccActions.GetPatientDetails,
                    });
                    patientCB(true, response.data[0][0]);
                } else {
                    dispatch({
                        type: ccActions.GetPatientDetails,
                    });
                    patientCB(false, "");
                }
            })
        };
    },
    createUnderwritingOrder: (userObject, uoObject) => {
        return dispatch => {
            return createUnderwritingOrder(userObject, uoObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: ccActions.CreateUnderwritingOrder,
                    });
                    uoObject.cb(true, "Creation Successful");
                } else {
                    dispatch({
                        type: ccActions.CreateUnderwritingOrder,
                    });
                    let message = "Creation Failed";
                    if (response.message.code != null) {
                        if (response.message.code == "ER_DUP_ENTRY") {
                            message = "Order Number already exists";
                        }
                    }
                    uoObject.cb(false, message);
                }
            })
        };
    },
    createCallLog: (userObject, clObject) => {
        return dispatch => {
            return createCallLog(userObject, clObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: ccActions.CreateCallLog,
                    });
                    clObject.cb(true, "Creation Successful");
                } else {
                    dispatch({
                        type: ccActions.CreateCallLog,
                    });
                    clObject.cb(false, "Creation Failed");
                }
            })
        };
    },
    editOrder: (userObject, editObject) => {
        return dispatch => {
            return editOrder(userObject, editObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: ccActions.EditOrder,
                    });
                    editObject.cb(true, "Edit Successful");
                } else {
                    dispatch({
                        type: ccActions.EditOrder,
                    });
                    editObject.cb(false, "Edit Failed");
                }
            })
        };
    },
    closeOrder: (userObject, oID, callback) => {
        return dispatch => {
            return closeOrder(userObject, oID).then(response => {
                if (response.success) {
                    dispatch({
                        type: ccActions.CloseOrder,
                    });
                    callback(true, "Closed Successful");
                } else {
                    dispatch({
                        type: ccActions.CloseOrder,
                    });
                    callback(false, "Closed Failed");
                }
            })
        };
    },
    cancelOrder: (userObject, oObject) => {
        return dispatch => {
            return cancelOrder(userObject, oObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: ccActions.CancelOrder,
                    });
                    oObject.cb(true, "Cancellation Successful");
                } else {
                    dispatch({
                        type: ccActions.CancelOrder,
                    });
                    oObject.cb(false, "Cancellation Failed");
                }
            })
        };
    },
    getOrderDetails: (userObject, oID) => {
        return dispatch => {
            return getOrderDetails(userObject, oID).then(response => {
                if (response.success) {
                    dispatch({
                        type: ccActions.GetOrderDetails,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: ccActions.GetOrderDetails,
                        data: response.data
                    });
                }
            })
        };
    }
}

export default ccActions

