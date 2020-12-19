import {
  getDashboard,
  getTopPatient,
  getTopDiagnosis,
  getAllVisits,
  getTopDoctors,
  getAllClaimsOfDoctorInClinic,
  getDrugsAndProcedures,
  getTopCompanyVisit,
  getClinicProfile
} from "./api";

const clinicActions = {
  GetDashboard: "GETCLINICDASHBOARD",
  GetTopPatient: "GETCLINICTOPPATIENT",
  GetTopDiagnosis: "GETCLINICTOPDIAGNOSIS",
  GetAllVisits: "GETCLINICALLVISITS",
  GetDrugAndProcedures: "GETDRUGSANDPROCEDURES",
  SetClinicID: "SETCLINICID",
  GetTopDoctors: "GETCLINICTOPDOCTORS",
  GetAllClaimsOfDoctorInClinic: "GETALLCLAIMSOFDOCTORINCLINIC",
  GetTopCompanyVisit: "GETTOPCOMPANYVISIT",
  GetClinicProfile: "GETCLINICPROFILE",


  getDashboard: (userObject, clinicID) => {
    return dispatch => {
      return getDashboard(userObject, clinicID).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetDashboard,
            data: response.data
          });
        } else {
          dispatch({
            type: clinicActions.GetDashboard,
            data: []
          });
        }
      });
    };
  },
  
  getTopPatient: (userObject, clinicID) => {
    return dispatch => {
      return getTopPatient(userObject, clinicID).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetTopPatient,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: clinicActions.GetTopPatient,
            data: []
          });
        }
      });
    };
  },
  getTopDiagnosis: (userObject, clinicID) => {
    return dispatch => {
      return getTopDiagnosis(userObject, clinicID).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetTopDiagnosis,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: clinicActions.GetTopDiagnosis,
            data: []
          });
        }
      });
    };
  },
  getAllVisits: (userObject, clinicID) => {
    return dispatch => {
      return getAllVisits(userObject, clinicID).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetAllVisits,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: clinicActions.GetAllVisits,
            data: []
          });
        }
      });
    };
  },

  getDrugsAndProcedures: (userObject, Rocno) => {
    return dispatch => {
      return getDrugsAndProcedures(userObject, Rocno).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetDrugAndProcedures,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: clinicActions.GetDrugAndProcedures,
            data: []
          });
        }
      });
    };
  },

  setClinicID: clinicID => {
    return {
      type: clinicActions.SetClinicID,
      data: clinicID
    };
  },
  getTopDoctors: (userObject, clinicID) => {
    return dispatch => {
      return getTopDoctors(userObject, clinicID).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetTopDoctors,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: clinicActions.GetTopDoctors,
            data: []
          });
        }
      });
    };
  },
  getAllClaimsOfDoctorInClinic: (userObject, clinicID, doctorValue) => {
    return dispatch => {
      return getAllClaimsOfDoctorInClinic(
        userObject,
        clinicID,
        doctorValue
      ).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetAllClaimsOfDoctorInClinic,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: clinicActions.GetAllClaimsOfDoctorInClinic,
            data: []
          });
        }
      });
    };
  },
  getTopCompanyVisit: (userObject, clinicID) => {
    return dispatch => {
      return getTopCompanyVisit(userObject, clinicID).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetTopCompanyVisit,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: clinicActions.GetTopCompanyVisit,
            data: []
          });
        }
      });
    };
  },
  getClinicProfile: (userObject, clinicID) => {
    return dispatch => {
      return getClinicProfile(userObject, clinicID).then(response => {
        if (response.success) {
          dispatch({
            type: clinicActions.GetClinicProfile,
            data: response.data[0][0]
          });
        } else {
          dispatch({
            type: clinicActions.GetClinicProfile,
            data: {}
          });
        }
      });
    };
  }
};

export default clinicActions;
