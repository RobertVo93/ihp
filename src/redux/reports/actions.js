import {
  getAllPolicies,
  getHeadcount,
  getS3OverviewCosts,
  getS4IPTopDiagnosis,
  getS5OPStats,
  getS7ChronicStats,
  getS8ChronicIllness,
  getS11IPTable,
  getS12IPTopDiagnosis,
  getS13IPTopProviders,
  getS14IPTopClaimants,
  getS16OPSPTable,
  getS17OPSPEntity,
  getS18OPSPTopDiagnosis,
  getS19OPSPTopProviders,
  getS20OPSPTopClaimants,
  getS22OPGPTable,
  getS23OPGPEntity,
  getS24OPGPTopDiagnosis,
  getS25OPGPTopProviders,
  getS26OPGPTopClaimants,
  getS27OPGPUtilization,
  getS28OPSPUtilization,
  getS29Chronicdemo,
  getS30PanelGpEntity,
  getS31PanelGpRelationship,
  nullifyReports
} from "./api";

const reportActions = {
  GetAllPolicies: "GETALLPOLICIES",
  GetPoliciesHeadcount: "GETPOLICIESHEADCOUNT",
  NullifyReports: "NULLIFYREPORTS",
  GetS3OverviewCosts: "GETS3OVERVIEWCOSTS",
  GetS4IPTopDiagnosis: "GETS4IPTOPDIAGNOSIS",
  GetS5OPStats: "GETS5OPSTATS",
  GetS7ChronicStats: "GETS7OPCHRONICSTATS",
  GetS8ChronicIllness: "GETS8CHRONICILLNESS",
  GetS11IPTable: "GETS11IPTABLE",
  GetS12IPTopDiagnosis: "GETS12IPTOPDIAGNOSIS",
  GetS13IPTopProviders: "GETS13IPTOPPROVIDERS",
  GetS14IPTopClaimants: "GETS14IPTOPCLAIMANTS",
  GetS16OPSPTable: "GETS16OPSPTABLE",
  GetS17OPSPEntity: "GETS17OPSPENTITY",
  GetS18OPSPTopDiagnosis: "GETS18OPSPTOPDIAGNOSIS",
  GetS19OPSPTopProviders: "GETS19OPSPTOPPROVIDERS",
  GetS20OPSPTopClaimants: "GETS20OPSPTOPCLAIMANTS",
  GetS22OPGPTable: "GETS22OPGPTABLE",
  GetS23OPGPEntity: "GETS23OPGPENTITY",
  GetS24OPGPTopDiagnosis: "GETS24OPGPTOPDIAGNOSIS",
  GetS25OPGPTopProviders: "GETS25OPGPTOPPROVIDERS",
  GetS26OPGPTopClaimants: "GETS26OPGPTOPCLAIMANTS",
  GetS27OPGPUtilization: "GETS27OPGPUTILIZATION",
  GetS28OPSPUtilization: "GETS28OPSPUTILIZATION",
  GetS29Chronicdemo: "GETS29CHRONICDEMO",
  GetS30PanelGpEntity: "GETS30PANELGPENTITY",
  GetS31PanelGpRelationship: "GETS31PANELGPRELATIONSHIP",
  getAllPolicies: userObject => {
    return dispatch => {
      return getAllPolicies(userObject).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetAllPolicies,
            data: response.data[0]
          });
        } else {
          dispatch({
            type: reportActions.GetAllPolicies,
            data: []
          });
        }
      });
    };
  },
  getHeadcount: (userObject, cStrings) => {
    return dispatch => {
      return getHeadcount(userObject, cStrings).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetPoliciesHeadcount,
            data: response.data
          });
        } else {
          dispatch({
            type: reportActions.GetPoliciesHeadcount,
            data: []
          });
        }
      });
    };
  },
  nullifyReports: () => {
    return {
      type: reportActions.NullifyReports,
      data: []
    };
  },
  getS3OverviewCosts: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS3OverviewCosts(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS3OverviewCosts,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS3OverviewCosts,
              data: []
            });
          }
        }
      );
    };
  },
  getS4IPTopDiagnosis: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS4IPTopDiagnosis(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS4IPTopDiagnosis,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS4IPTopDiagnosis,
              data: []
            });
          }
        }
      );
    };
  },
  getS5OPStats: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS5OPStats(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS5OPStats,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS5OPStats,
              data: []
            });
          }
        }
      );
    };
  },
  getS7ChronicStats: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS7ChronicStats(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS7ChronicStats,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS7ChronicStats,
              data: []
            });
          }
        }
      );
    };
  },
  getS8ChronicIllness: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS8ChronicIllness(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS8ChronicIllness,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS8ChronicIllness,
              data: []
            });
          }
        }
      );
    };
  },
  getS11IPTable: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS11IPTable(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS11IPTable,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS11IPTable,
              data: []
            });
          }
        }
      );
    };
  },
  getS12IPTopDiagnosis: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS12IPTopDiagnosis(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS12IPTopDiagnosis,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS12IPTopDiagnosis,
              data: []
            });
          }
        }
      );
    };
  },
  getS13IPTopProviders: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS13IPTopProviders(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS13IPTopProviders,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS13IPTopProviders,
              data: []
            });
          }
        }
      );
    };
  },
  getS14IPTopClaimants: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS14IPTopClaimants(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS14IPTopClaimants,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS14IPTopClaimants,
              data: []
            });
          }
        }
      );
    };
  },
  getS16OPSPTable: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS16OPSPTable(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS16OPSPTable,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS16OPSPTable,
              data: []
            });
          }
        }
      );
    };
  },
  getS17OPSPEntity: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS17OPSPEntity(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS17OPSPEntity,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS17OPSPEntity,
              data: []
            });
          }
        }
      );
    };
  },
  getS18OPSPTopDiagnosis: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS18OPSPTopDiagnosis(
        userObject,
        cObjects,
        dateTo,
        dateFrom
      ).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetS18OPSPTopDiagnosis,
            data: response.data
          });
        } else {
          dispatch({
            type: reportActions.GetS18OPSPTopDiagnosis,
            data: []
          });
        }
      });
    };
  },
  getS19OPSPTopProviders: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS19OPSPTopProviders(
        userObject,
        cObjects,
        dateTo,
        dateFrom
      ).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetS19OPSPTopProviders,
            data: response.data
          });
        } else {
          dispatch({
            type: reportActions.GetS19OPSPTopProviders,
            data: []
          });
        }
      });
    };
  },
  getS20OPSPTopClaimants: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS20OPSPTopClaimants(
        userObject,
        cObjects,
        dateTo,
        dateFrom
      ).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetS20OPSPTopClaimants,
            data: response.data
          });
        } else {
          dispatch({
            type: reportActions.GetS20OPSPTopClaimants,
            data: []
          });
        }
      });
    };
  },
  getS22OPGPTable: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS22OPGPTable(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS22OPGPTable,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS22OPGPTable,
              data: []
            });
          }
        }
      );
    };
  },
  getS23OPGPEntity: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS23OPGPEntity(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS23OPGPEntity,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS23OPGPEntity,
              data: []
            });
          }
        }
      );
    };
  },
  getS24OPGPTopDiagnosis: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS24OPGPTopDiagnosis(
        userObject,
        cObjects,
        dateTo,
        dateFrom
      ).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetS24OPGPTopDiagnosis,
            data: response.data
          });
        } else {
          dispatch({
            type: reportActions.GetS24OPGPTopDiagnosis,
            data: []
          });
        }
      });
    };
  },
  getS25OPGPTopProviders: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS25OPGPTopProviders(
        userObject,
        cObjects,
        dateTo,
        dateFrom
      ).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetS25OPGPTopProviders,
            data: response.data
          });
        } else {
          dispatch({
            type: reportActions.GetS25OPGPTopProviders,
            data: []
          });
        }
      });
    };
  },
  getS26OPGPTopClaimants: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS26OPGPTopClaimants(
        userObject,
        cObjects,
        dateTo,
        dateFrom
      ).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetS26OPGPTopClaimants,
            data: response.data
          });
        } else {
          dispatch({
            type: reportActions.GetS26OPGPTopClaimants,
            data: []
          });
        }
      });
    };
  },
  getS27OPGPUtilization: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS27OPGPUtilization(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS27OPGPUtilization,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS27OPGPUtilization,
              data: []
            });
          }
        }
      );
    };
  },
  getS28OPSPUtilization: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS28OPSPUtilization(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS28OPSPUtilization,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS28OPSPUtilization,
              data: []
            });
          }
        }
      );
    };
  },

  getS29Chronicdemo: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS29Chronicdemo(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS29Chronicdemo,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS29Chronicdemo,
              data: []
            });
          }
        }
      );
    };
  },

  getS30PanelGpEntity: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS30PanelGpEntity(userObject, cObjects, dateTo, dateFrom).then(
        response => {
          if (response.success) {
            dispatch({
              type: reportActions.GetS30PanelGpEntity,
              data: response.data
            });
          } else {
            dispatch({
              type: reportActions.GetS30PanelGpEntity,
              data: []
            });
          }
        }
      );
    };
  },

  getS31PanelGpRelationship: (userObject, cObjects, dateTo, dateFrom) => {
    return dispatch => {
      return getS31PanelGpRelationship(
        userObject,
        cObjects,
        dateTo,
        dateFrom
      ).then(response => {
        if (response.success) {
          dispatch({
            type: reportActions.GetS31PanelGpRelationship,
            data: response.data
          });
        } else {
          dispatch({
            type: reportActions.GetS31PanelGpRelationship,
            data: []
          });
        }
      });
    };
  }
};

export default reportActions;
