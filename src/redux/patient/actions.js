import {
  getDashboard,
  getTopDiagnosis,
  getAllVisits,
  getTopClinics,
  getVisitsByMonths,
  getPatientTimeline
} from "./api";

const patActions = {
  SetPatientID: "SETPATIENTID",
  GetDashboard: "GETPATIENTDASHBOARD",
  GetTopDiagnosis: "GETPATIENTTOPDIAGNOSIS",
  GetAllVisits: "GETPATIENTVISITS",
  GetTopClinics: "GETPATIENTTOPCLINICS",
  GetVisitsByMonths: "GETPATIENTVISITSBYMONTHS",
  GetPatientTimeline: "GETPATIENTTIMELINE",

  getDashboard: (userObject, patientID) => {
    return dispatch => {
      return getDashboard(userObject, patientID).then(response => {
        if (response.success) {
          dispatch({
            type: patActions.GetDashboard,
            data: response.data
          });
        } else {
          dispatch({
            type: patActions.GetDashboard,
            data: []
          });
        }
      });
    };
  },
  getTopDiagnosis: (userObject, patientID) => {
    return dispatch => {
      return getTopDiagnosis(userObject, patientID).then(response => {
        if (response.success) {
          dispatch({
            type: patActions.GetTopDiagnosis,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: patActions.GetTopDiagnosis,
            data: []
          });
        }
      });
    };
  },
  getAllVisits: (userObject, patientID) => {
    return dispatch => {
      return getAllVisits(userObject, patientID).then(response => {
        if (response.success) {
          dispatch({
            type: patActions.GetAllVisits,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: patActions.GetAllVisits,
            data: []
          });
        }
      });
    };
  },
  getTopClinics: (userObject, patientID) => {
    return dispatch => {
      return getTopClinics(userObject, patientID).then(response => {
        if (response.success) {
          dispatch({
            type: patActions.GetTopClinics,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: patActions.GetTopClinics,
            data: []
          });
        }
      });
    };
  },
  getVisitsByMonths: (userObject, patientID) => {
    return dispatch => {
      return getVisitsByMonths(userObject, patientID).then(response => {
        if (response.success) {
          dispatch({
            type: patActions.GetVisitsByMonths,
            data: response.data
          });
        } else {
          dispatch({
            type: patActions.GetVisitsByMonths,
            data: []
          });
        }
      });
    };
  },
  getPatientTimeline: (userObject, patientID) => {
    return dispatch => {
      return getPatientTimeline(userObject, patientID).then(response => {
        if (response.success) {
          dispatch({
            type: patActions.GetPatientTimeline,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: patActions.GetPatientTimeline,
            data: []
          });
        }
      });
    };
  },
  setPatientID: patientID => {
    return {
      type: patActions.SetPatientID,
      data: patientID
    };
  }
};

export default patActions;
