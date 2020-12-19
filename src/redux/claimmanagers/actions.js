import {
    getDashboard
    , getClaimsDates
    , getTopVisitTypes
    , getTopCompanyUtilization
    , getTopEmployeeSpending
    , getTopClinicUtilization
    , getTopDiagnosis
    , getTopClassifications
    , getVisitsByMonths
    , getClaimsDetailsAndHistory
    , getAllClaimsDetailsAndHistory
    , getCMAllProviders
} from './api';

const cmActions = {
    GetDashboard: 'GETDASHBOARD',
    GetClaimsDates: 'GETCLAIMSDATES',
    GetTopVisitTypes: 'GETTOPVISITTYPES',
    GetTopCompanyUtilization: 'GETTOPCOMPANYUTILIZATION',
    GetTopEmployeeSpending: 'GETTOPEMPLOYEESPENDING',
    GetTopClinicUtilization: 'GETTOPCLINICUTILIZATION',
    GetTopDiagnosis: 'GETTOPDIAGNOSIS',
    GetVisitsByMonths: 'GETVISITSBYMONTHS',
    GetTopClassifications: 'GETTOPCLASSIFICATIONS',
    GetClaimDetailsAndHistory: 'GETCLAIMDETAILSANDHISTORY',
    GetAllClaimsDetailsAndHistory: 'GETALLCLAIMSDETAILANDHISTORY',
    GetCMTopProviders: 'GETTOPPROVIDERS',

    getDashboard: (userObject) => {
        return dispatch => {
            return getDashboard(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetDashboard,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: cmActions.GetDashboard,
                        data: []
                    });
                }
            })
        };
    },
    getClaimsDates: (userObject) => {
        return dispatch => {
            return getClaimsDates(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetClaimsDates,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: cmActions.GetClaimsDates,
                        data: []
                    });
                }
            })
        };
    },
    getTopVisitTypes: (userObject) => {
        return dispatch => {
            return getTopVisitTypes(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetTopVisitTypes,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: cmActions.GetTopVisitTypes,
                        data: []
                    });
                }
            })
        };
    },
    getTopCompanyUtilization: (userObject) => {
        return dispatch => {
            return getTopCompanyUtilization(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetTopCompanyUtilization,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: cmActions.GetTopCompanyUtilization,
                        data: []
                    });
                }
            })
        };
    },
    getTopEmployeeSpending: (userObject) => {
        return dispatch => {
            return getTopEmployeeSpending(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetTopEmployeeSpending,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: cmActions.GetTopEmployeeSpending,
                        data: []
                    });
                }
            })
        };
    },
    getTopClinicUtilization: (userObject) => {
        return dispatch => {
            return getTopClinicUtilization(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetTopClinicUtilization,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: cmActions.GetTopClinicUtilization,
                        data: []
                    });
                }
            })
        };
    },
    getTopDiagnosis: (userObject) => {
        return dispatch => {
            return getTopDiagnosis(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetTopDiagnosis,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: cmActions.GetTopDiagnosis,
                        data: []
                    });
                }
            })
        };
    },
    getTopClassifications: (userObject) => {
        return dispatch => {
            return getTopClassifications(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetTopClassifications,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: cmActions.GetTopClassifications,
                        data: []
                    });
                }
            })
        };
    },
    getVisitsByMonths: (userObject) => {
        return dispatch => {
            return getVisitsByMonths(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetVisitsByMonths,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: cmActions.GetVisitsByMonths,
                        data: []
                    });
                }
            })
        };
    },
    getClaimDetailsAndHistory: (userObject, claimID) => {
        return dispatch => {
            return getClaimsDetailsAndHistory(userObject, claimID).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetClaimDetailsAndHistory,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: cmActions.GetClaimDetailsAndHistory,
                        data: []
                    });
                }
            })
        };
    },
    getAllClaimsDetailsAndHistory: (userObject, claimID) => {
        return dispatch => {
            return getAllClaimsDetailsAndHistory(userObject, claimID).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetAllClaimsDetailsAndHistory,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: cmActions.GetAllClaimsDetailsAndHistory,
                        data: []
                    });
                }
            })
        };
    },
    getCMAllProviders: (userObject) => {
        return dispatch => {
            return getCMAllProviders(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: cmActions.GetCMTopProviders,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: cmActions.GetCMTopProviders,
                        data: []
                    });
                }
            });
        };
    }
}

export default cmActions