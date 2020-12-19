import { getUserInfo, updateUserInfo, suspendUser, sendResetPassword, checkResetPassword, updatePassword, uploadLogo, getRoles, createRole, updateRole ,addUser, createNewPassword, getLabelSettings, updateLabelSettings, createwhitelabelsettings, getNewVersionFeatures, updateUserNotifyVersion } from "./api";

const userActions = {
    GetUserInfo: 'GETUSERINFO',
    UpdateUserInfo: 'UPDATEUSERINFO',
    SetResetToken: 'SETRESETTOKEN',
    UpdatePassword: 'UPDATEPASSWORD',
    GetLabelSettings: 'GETWHITELABELSETTINGS',
    GetNewVersionFeatures: 'GETNEWVERSIONFEATURES',
    GetAllRoles: 'GETALLROLES',

    getUserInfo: (userObject) => {
        return dispatch => {
            return getUserInfo(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: userActions.GetUserInfo,
                        data: response.users
                    });
                } else {
                    dispatch({
                        type: userActions.GetUserInfo,
                        data: []
                    });
                }
            })
        };
    },

    updateUserInfo: (userObject, data) => {
        return dispatch => {
            return updateUserInfo(userObject, data).then(response => {
                if (response.success) {
                    dispatch({
                        type: userActions.UpdateUserInfo,
                        data: response.users
                    });
                    window.location.reload()
                } else {
                    dispatch({
                        type: userActions.UpdateUserInfo,
                        data: []
                    });
                }
            })
        };
    },

    uploadLogo: (data) => {
        return uploadLogo(data)
    },

    suspendUser: (userObject, data) => {
        return dispatch => {
            return suspendUser(userObject, data).then(response => {
                if (response.success) {
                    dispatch({
                        type: userActions.UpdateUserInfo,
                        data: response.users
                    });
                } else {
                    dispatch({
                        type: userActions.UpdateUserInfo,
                        data: []
                    });
                }
            })
        };
    },

    updatePassword: (data) => {
        return updatePassword(data);
    },

    createNewPassword: (data) => {
        return createNewPassword(data);
    },


    checkResetPassword: (data) => {
        return dispatch => {

            return checkResetPassword(data).then(response => {
                if (response.success) {
                    dispatch({
                        type: userActions.SetResetToken,
                        data: response.users
                    });
                } else {
                    dispatch({
                        type: userActions.SetResetToken,
                        data: null
                    });
                }
            })
        };
    },

    getAllRoles: (userObject) => {
        return dispatch => {
            return getRoles(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: userActions.GetAllRoles,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: userActions.GetAllRoles,
                        data: null
                    });
                }
            })
        };
    },

    createRole: (userObject, data) => {
        return createRole(userObject, data)
    },

    updateRole: (userObject, data) => {
        return updateRole(userObject, data)
    },
    
    

    addUser: (userObject, data) => {
        return dispatch => {
            return addUser(userObject, data);
        }
    },

    getLabelSettings: (userObject) => {
        return dispatch => {
            return getLabelSettings(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: userActions.GetLabelSettings,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: userActions.GetLabelSettings,
                        data: null
                    });
                }
            })
        };
    },

    updateLabelSettings: (userObject, data) => {
        return updateLabelSettings(userObject, data)
    },

    createLabelSettings: (userObject, data) => {
        return createwhitelabelsettings(userObject, data)
    },

    getNewVersionFeatures: (userObject) => {
        return dispatch => {
            return getNewVersionFeatures(userObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: userActions.GetNewVersionFeatures,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: userActions.GetNewVersionFeatures,
                        data: null
                    });
                }
            });
        };
    },

    updateUserNotifyVersion: (userObject) => {
        return dispatch => {
            return updateUserNotifyVersion(userObject).then(response => {
                dispatch({
                    type: userActions.GetNewVersionFeatures,
                    data: null
                });
            });
        };
    }

}

export default userActions