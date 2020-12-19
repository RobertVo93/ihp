import reportsActions from "./actions";

const initState = {
  allPolicies: [],
  policiesHeadcount: [],
  S3OverviewCosts: null,
  S4IPTopDiagnosis: null,
  S5OPStats: null,
  S7ChronicStats: null,
  S8ChronicIllness: null,
  S11IPTable: null,
  S12IPTopDiagnosis: null,
  S13IPTopProviders: null,
  S14IPTopClaimants: null,
  S16OPSPTable: null,
  S17OPSPEntity: null,
  S18OPSPTopDiagnosis: null,
  S19OPSPTopProviders: null,
  S20OPSPTopClaimants: null,
  S22OPGPTable: null,
  S23OPGPEntity: null,
  S24OPGPTopDiagnosis: null,
  S25OPGPTopProviders: null,
  S26OPGPTopClaimants: null,
  S27OPGPUtilization: null,
  S28OPSPUtilization: null,
  S29Chronicdemo: null,
  S30PanelPgEntity: null,
  S31PanelPgRelationship: null
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case reportsActions.GetAllPolicies:
      return {
        ...state,
        allPolicies: action.data
      };
    case reportsActions.GetPoliciesHeadcount:
      return {
        ...state,
        policiesHeadcount: action.data
      };
    case reportsActions.GetS3OverviewCosts:
      return {
        ...state,
        S3OverviewCosts: action.data
      };
    case reportsActions.GetS4IPTopDiagnosis:
      return {
        ...state,
        S4IPTopDiagnosis: action.data
      };
    case reportsActions.GetS5OPStats:
      return {
        ...state,
        S5OPStats: action.data
      };
    case reportsActions.GetS7ChronicStats:
      return {
        ...state,
        S7ChronicStats: action.data
      };
    case reportsActions.GetS8ChronicIllness:
      return {
        ...state,
        S8ChronicIllness: action.data
      };
    case reportsActions.GetS11IPTable:
      return {
        ...state,
        S11IPTable: action.data
      };
    case reportsActions.GetS12IPTopDiagnosis:
      return {
        ...state,
        S12IPTopDiagnosis: action.data
      };
    case reportsActions.GetS13IPTopProviders:
      return {
        ...state,
        S13IPTopProviders: action.data
      };
    case reportsActions.GetS14IPTopClaimants:
      return {
        ...state,
        S14IPTopClaimants: action.data
      };
    case reportsActions.GetS16OPSPTable:
      return {
        ...state,
        S16OPSPTable: action.data
      };
    case reportsActions.GetS17OPSPEntity:
      return {
        ...state,
        S17OPSPEntity: action.data
      };
    case reportsActions.GetS18OPSPTopDiagnosis:
      return {
        ...state,
        S18OPSPTopDiagnosis: action.data
      };
    case reportsActions.GetS19OPSPTopProviders:
      return {
        ...state,
        S19OPSPTopProviders: action.data
      };
    case reportsActions.GetS20OPSPTopClaimants:
      return {
        ...state,
        S20OPSPTopClaimants: action.data
      };
    case reportsActions.GetS22OPGPTable:
      return {
        ...state,
        S22OPGPTable: action.data
      };
    case reportsActions.GetS23OPGPEntity:
      return {
        ...state,
        S23OPGPEntity: action.data
      };
    case reportsActions.GetS24OPGPTopDiagnosis:
      return {
        ...state,
        S24OPGPTopDiagnosis: action.data
      };
    case reportsActions.GetS25OPGPTopProviders:
      return {
        ...state,
        S25OPGPTopProviders: action.data
      };
    case reportsActions.GetS26OPGPTopClaimants:
      return {
        ...state,
        S26OPGPTopClaimants: action.data
      };
    case reportsActions.GetS27OPGPUtilization:
      return {
        ...state,
        S27OPGPUtilization: action.data
      };
    case reportsActions.GetS28OPSPUtilization:
      return {
        ...state,
        S28OPSPUtilization: action.data
      };
    case reportsActions.GetS29Chronicdemo:
      return {
        ...state,
        S29Chronicdemo: action.data
      };
    case reportsActions.GetS30PanelGpEntity:
      return {
        ...state,
        S30PanelPgEntity: action.data
      };
    case reportsActions.GetS31PanelGpRelationship:
      return {
        ...state,
        S31PanelPgRelationship: action.data
      };
    case reportsActions.NullifyReports:
      return {
        ...state,
        S3OverviewCosts: null,
        S4IPTopDiagnosis: null,
        S5OPStats: null,
        S7ChronicStats: null,
        S8ChronicIllness: null,
        S11IPTable: null,
        S12IPTopDiagnosis: null,
        S13IPTopProviders: null,
        S14IPTopClaimants: null,
        S16OPSPTable: null,
        S17OPSPEntity: null,
        S18OPSPTopDiagnosis: null,
        S19OPSPTopProviders: null,
        S20OPSPTopClaimants: null,
        S22OPGPTable: null,
        S23OPGPEntity: null,
        S24OPGPTopDiagnosis: null,
        S25OPGPTopProviders: null,
        S26OPGPTopClaimants: null,
        S27OPGPUtilization: null,
        S28OPSPUtilization: null,
        S29Chronicdemo: null,
        S30PanelPgEntity: null,
        S31PanelPgRelationship: null
      };
    default:
      return state;
  }
}
