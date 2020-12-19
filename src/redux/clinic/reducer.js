import clinicActions from "./actions";

const initState = {
	viewingClinicID: localStorage.getItem("view_clinic_id")
		? localStorage.getItem("view_clinic_id")
		: null,
	clinicTopDashboard: [],
	clinicTopPatient: [],
	clinicTopDiagnosis: [],
	clinicAllVisits: [],
	clinicDrugsAndProcedures: [],
	clinicTopDoctors: [],
	allClaimsOfDoctor: [],
	clinicTopCompanyVisit: [],
	clinicProfile: {}
};

export default function rootReducer(state = initState, action) {
	switch (action.type) {
		case clinicActions.SetClinicID:
			return {
				...state,
				clinicTopDashboard:
					state.viewingClinicID == action.data ? state.viewingClinicID : [],
				viewingClinicID: action.data
			};
		case clinicActions.GetDashboard:
			return {
				...state,
				clinicTopDashboard: action.data
			};
		case clinicActions.GetTopPatient:
			return {
				...state,
				clinicTopPatient: action.data
			};
		case clinicActions.GetTopDiagnosis:
			return {
				...state,
				clinicTopDiagnosis: action.data
			};
		case clinicActions.GetAllVisits:
			return {
				...state,
				clinicAllVisits: action.data
			};
		case clinicActions.GetDrugAndProcedures:
			return {
				...state,
				clinicDrugsAndProcedures: action.data
			};
		case clinicActions.GetTopDoctors:
			return {
				...state,
				clinicTopDoctors: action.data
			};
		case clinicActions.GetAllClaimsOfDoctorInClinic:
			return {
				...state,
				allClaimsOfDoctor: action.data
			};
		case clinicActions.GetTopCompanyVisit:
			return {
				...state,
				clinicTopCompanyVisit: action.data
			};
		case clinicActions.GetClinicProfile:
			return {
				...state,
				clinicProfile: action.data||{}
			};
		default:
			return state;
	}
}
