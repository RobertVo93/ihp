import { getDashboard, getTopClinics, getTopPatients } from './api';

const diagActions = {
    GetDashboard: 'GETDIAGNOSISDASHBOARD',
    SetDiagnosisID: 'SETDIAGNOSISID',
    GetTopClinics: 'GETDIAGNOSISTOPCLINICS',
    GetTopPatients: 'GETDIAGNOSISTOPPATIENTS',

    getDashboard: (userObject, diagnosisID) => {
        return dispatch => {
            return getDashboard(userObject, diagnosisID).then(response => {
                if (response.success) {
                    dispatch({
                        type: diagActions.GetDashboard,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: diagActions.GetDashboard,
                        data: []
                    });
                }
            })
        };
    },
    getTopClinics: (userObject, diagnosisID) => {
        return dispatch => {
            return getTopClinics(userObject, diagnosisID).then(response => {
                if (response.success) {
                    dispatch({
                        type: diagActions.GetTopClinics,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: diagActions.GetTopClinics,
                        data: []
                    });
                }
            })
        };
    },
    getTopPatients: (userObject, diagnosisID) => {
        return dispatch => {
            return getTopPatients(userObject, diagnosisID).then(response => {
                if (response.success) {
                    dispatch({
                        type: diagActions.GetTopPatients,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: diagActions.GetTopPatients,
                        data: []
                    });
                }
            })
        };
    },
    setDiagnosisID: (diagnosisID) => {
        return {
            type: diagActions.SetDiagnosisID,
            data: diagnosisID
        };
    }
}

export default diagActions