import {
    getDashboard, getHeadcount, getVisitType, getTopEmployeeSpending, getTopEmployeeMC, getTopClinics, getTopDiagnosis, getTopDiagnosisMC, getVisitsByMonths,
    getProfileInpatientDashboard, getProfileInpatientDemographics, getProfileInpatientRelationsSpendings, getProfileInpatientTopDiagnosis, getProfileInpatientClassifications, getProfileInpatientTopEmployees, getProfileInpatientTopProviders, getProfileInpatientVisitsByMonths,
    getProfileOutpatientDashboard, getProfileOutpatientDemographics, getProfileOutpatientRelationsSpendings, getProfileOutpatientTopDiagnosis, getProfileOutpatientClassifications, getProfileOutpatientTopEmployees, getProfileOutpatientTopProviders, getProfileOutpatientVisitsByMonths,
    getProductivityDashboard, getProductivityDemographics, getProductivityMCOverMonths, getProductivityTopEmployees, getProductivityTopClinicHoppers,
    getClaimsBreakdown, getRelationsBreakdown, getListCompanyByFilter, getCompanyProfile, getCompanyGLBreakdown, getCompanyDeclineGL, getCompanyTopHospitalsForGL, getCompanyGLOvermonth, getCompanyGLDashboard,getCompanyGLDashboardByType
} from './api';

const compActions = {
    GetDashboard: 'GETCOMPANYDASHBOARD',
    GetCompanyID: 'GETCOMPANYID',
    SetCompanyID: 'SETCOMPANYID',
    GetCompanyHeadcount: 'GETCOMPANYHEADCOUNT',
    GetCompanyVisitType: 'GETCOMPANYVISITTYPE',
    GetCompanyTopEmployeeSpending: 'GETCOMPANYTOPEMPLOYEESPENDING',
    GetCompanyTopEmployeeMC: 'GETCOMPANYTOPEMPLOYEEMC',
    GetCompanyTopClinics: 'GETCOMPANYTOPCLINICS',
    GetCompanyTopDiagnosis: 'GETCOMPANYTOPDIAGNOSIS',
    GetCompanyTopDiagnosisMC: 'GETCOMPANYTOPDIAGNOSISMC',
    GetCompanyVisitsByMonths: 'GETCOMPANYVISITSBYMONTHS',
    GetCompanyProfileDashboard: 'GETCOMPANYPROFILEDASHBORAD',
    GetCompanyProfileDemographics: 'GETCOMPANYPROFILEDEMOGRAPHICS',
    GetCompanyProfileRelations: 'GETCOMPANYPROFILERELATIONS',
    GetCompanyProfileTopDiagnosis: 'GETCOMPANYPROFILETOPDIAGNOSIS',
    GetCompanyProfileClassifications: 'GETCOMPANYPROFILECLASSIFICATIONS',
    GetCompanyProfileTopProviders: 'GETCOMPANYPROFILETOPPROVIDERS',
    GetCompanyProfileTopEmployees: 'GETCOMPANYPROFILETOPEMPLOYEES',
    GetCompanyProfileVisitsByMonths: 'GETCOMPANYPROFILEVISITSBYMONTHS',
    GetCompanyProductivityDashboard: 'GETCOMPANYPRODUCTIVITYDASHBOARD',
    GetCompanyProductivityDemographics: 'GETCOMPANYPRODUCTIVITYDEMOGRAPHICS',
    GetCompanyProductivityMCOverMonths: 'GETCOMPANYPRODUCTIVITYMCOVERMONTHS',
    GetCompanyProductivityTopEmployees: 'GETCOMPANYPRODUCTIVITYTOPEMPLOYEES',
    GetCompanyProductivityTopClinicHoppers: 'GETCOMPANYPRODUCTIVITYTOPCLINICHOPPERS',
    GetCompanyClaimsBreakdown: 'GETCOMPANYCLAIMSBREAKDOWN',
    GetCompanyRelationsBreakdown: 'GETCOMPANYRELATIONSBREAKDOWN',
    GetListCompanyByFilter: 'GETLISTCOMPANYBYFILTER',
    GetTotalFilteredCompany: 'GETTOTALFILTEREDCOMPANY',
    LoadmoreCompanyList: 'LOADMORECOMPANYLIST',
    GetCompanyProfile: "GETCOMPANYPROFILE",
    GetCompanyGLDashboard: "GETCOMPANYGLDASHBOARD",
    GetCompanyDeclineGL: "GETCOMPANYDECLINEGL",
    GetCompanyGLBreakdown: "GETCOMPANYGLBREAKDOWN",
    GetCompanyTopHospitalsForGL: "GETCOMPANYTOPHOSPITALSFORGL",
    GetCompanyGLOvermonth: "GETCOMPANYGLOVERMONTH",
    GetCompanyGLDashboardByType: "GETCOMPANYGLDASHBOARDBYTYPE",

    getDashboard: (userObject, companyID) => {
        return dispatch => {
            return getDashboard(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetDashboard,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetDashboard,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyHeadcount: (userObject, companyID) => {
        return dispatch => {
            return getHeadcount(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyHeadcount,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyHeadcount,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyVisitType: (userObject, companyID) => {
        return dispatch => {
            return getVisitType(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyVisitType,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyVisitType,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyTopEmployeeSpending: (userObject, companyID) => {
        return dispatch => {
            return getTopEmployeeSpending(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyTopEmployeeSpending,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyTopEmployeeSpending,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyTopEmployeeMC: (userObject, companyID) => {
        return dispatch => {
            return getTopEmployeeMC(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyTopEmployeeMC,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyTopEmployeeMC,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyTopClinics: (userObject, companyID) => {
        return dispatch => {
            return getTopClinics(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyTopClinics,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyTopClinics,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyTopDiagnosis: (userObject, companyID) => {
        return dispatch => {
            return getTopDiagnosis(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyTopDiagnosis,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyTopDiagnosis,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyTopDiagnosisMC: (userObject, companyID) => {
        return dispatch => {
            return getTopDiagnosisMC(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyTopDiagnosisMC,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyTopDiagnosisMC,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyVisitsByMonths: (userObject, companyID) => {
        return dispatch => {
            return getVisitsByMonths(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyVisitsByMonths,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyVisitsByMonths,
                        data: []
                    });
                }
            })
        };
    },
    setCompanyID: (companyID) => {
        return {
            type: compActions.SetCompanyID,
            data: companyID
        };
    },
    getCompanyInpatientProfileDashboard: (userObject, companyID) => {
        return dispatch => {
            return getProfileInpatientDashboard(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileDashboard,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileDashboard,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyInpatientProfileDemographics: (userObject, companyID) => {
        return dispatch => {
            return getProfileInpatientDemographics(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileDemographics,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileDemographics,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyInpatientProfileRelations: (userObject, companyID) => {
        return dispatch => {
            return getProfileInpatientRelationsSpendings(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileRelations,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileRelations,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyInpatientProfileTopDiagnosis: (userObject, companyID) => {
        return dispatch => {
            return getProfileInpatientTopDiagnosis(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileTopDiagnosis,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileTopDiagnosis,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyInpatientProfileClassfications: (userObject, companyID) => {
        return dispatch => {
            return getProfileInpatientClassifications(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileClassifications,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileClassifications,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyInpatientProfileTopProviders: (userObject, companyID) => {
        return dispatch => {
            return getProfileInpatientTopProviders(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileTopProviders,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileTopProviders,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyInpatientProfileTopEmployees: (userObject, companyID) => {
        return dispatch => {
            return getProfileInpatientTopEmployees(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileTopEmployees,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileTopEmployees,
                        data: []
                    });
                }
            })
        };
    },
    getProfileInpatientVisitsByMonths: (userObject, companyID) => {
        return dispatch => {
            return getProfileInpatientVisitsByMonths(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileVisitsByMonths,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileVisitsByMonths,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyOutpatientProfileDashboard: (userObject, companyID, vType) => {
        return dispatch => {
            return getProfileOutpatientDashboard(userObject, companyID, vType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileDashboard,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileDashboard,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyOutpatientProfileDemographics: (userObject, companyID, vType) => {
        return dispatch => {
            return getProfileOutpatientDemographics(userObject, companyID, vType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileDemographics,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileDemographics,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyOutpatientProfileRelations: (userObject, companyID, vType) => {
        return dispatch => {
            return getProfileOutpatientRelationsSpendings(userObject, companyID, vType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileRelations,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileRelations,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyOutpatientProfileTopDiagnosis: (userObject, companyID, vType) => {
        return dispatch => {
            return getProfileOutpatientTopDiagnosis(userObject, companyID, vType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileTopDiagnosis,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileTopDiagnosis,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyOutpatientProfileClassifications: (userObject, companyID, vType) => {
        return dispatch => {
            return getProfileOutpatientClassifications(userObject, companyID, vType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileClassifications,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileClassifications,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyOutpatientProfileTopProviders: (userObject, companyID, vType) => {
        return dispatch => {
            return getProfileOutpatientTopProviders(userObject, companyID, vType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileTopProviders,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileTopProviders,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyOutpatientProfileTopEmployees: (userObject, companyID, vType) => {
        return dispatch => {
            return getProfileOutpatientTopEmployees(userObject, companyID, vType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileTopEmployees,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileTopEmployees,
                        data: []
                    });
                }
            })
        };
    },
    getProfileOutpatientVisitsByMonths: (userObject, companyID, vType) => {
        return dispatch => {
            return getProfileOutpatientVisitsByMonths(userObject, companyID, vType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfileVisitsByMonths,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfileVisitsByMonths,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyProductivityDashboard: (userObject, companyID) => {
        return dispatch => {
            return getProductivityDashboard(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProductivityDashboard,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProductivityDashboard,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyProductivityDemographics: (userObject, companyID) => {
        return dispatch => {
            return getProductivityDemographics(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProductivityDemographics,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProductivityDemographics,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyProductivityMCOverMonths: (userObject, companyID) => {
        return dispatch => {
            return getProductivityMCOverMonths(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProductivityMCOverMonths,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProductivityMCOverMonths,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyProductivityTopEmployees: (userObject, companyID) => {
        return dispatch => {
            return getProductivityTopEmployees(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProductivityTopEmployees,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProductivityTopEmployees,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyProductivityTopClinicHoppers: (userObject, companyID) => {
        return dispatch => {
            return getProductivityTopClinicHoppers(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProductivityTopClinicHoppers,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProductivityTopClinicHoppers,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyClaimsBreakdown: (userObject, companyID) => {
        return dispatch => {
            return getClaimsBreakdown(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyClaimsBreakdown,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyClaimsBreakdown,
                        data: []
                    });
                }
            })
        };
    },
    getCompanyRelationsBreakdown: (userObject, companyID) => {
        return dispatch => {
            return getRelationsBreakdown(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyRelationsBreakdown,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyRelationsBreakdown,
                        data: []
                    });
                }
            })
        };
    },
    getListCompanyByFilter: (userObject, filterObject) => {
        return dispatch => {
            return getListCompanyByFilter(userObject, filterObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetTotalFilteredCompany,
                        data: response.data[0]
                    });
                    dispatch({
                        type: compActions.GetListCompanyByFilter,
                        data: response.data[1]
                    });
                } else {
                    dispatch({
                        type: compActions.GetTotalFilteredCompany,
                        data: 0
                    });
                    dispatch({
                        type: compActions.GetListCompanyByFilter,
                        data: []
                    });
                }
            })
        };
    },
    loadmoreCompanyList: (userObject, filterObject) => {
        return dispatch => {
            return getListCompanyByFilter(userObject, filterObject).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.LoadmoreCompanyList,
                        data: response.data[1]
                    });
                } else {
                    dispatch({
                        type: compActions.LoadmoreCompanyList,
                        data: []
                    });
                }
            })
        };
    },
    clearCompanyList: () => {
        return dispatch => {
            dispatch({
                type: compActions.GetListCompanyByFilter,
                data: []
            });
        };
    },
    getCompanyProfile: (userObject, companyID) => {
        return dispatch => {
            return getCompanyProfile(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyProfile,
                        data: response.data[0][0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyProfile,
                        data: {}
                    });
                }
            });
        };
    },
    getCompanyGLDashboard: (userObject, companyID) => {
        return dispatch => {
            return getCompanyGLDashboard(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyGLDashboard,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyGLDashboard,
                        data: []
                    });
                }
            });
        };
    },
    getCompanyGLBreakdown: (userObject, companyID) => {
        return dispatch => {
            return getCompanyGLBreakdown(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyGLBreakdown,
                        data: response.data
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyGLBreakdown,
                        data: []
                    });
                }
            });
        };
    },
    getCompanyDeclineGL: (userObject, companyID) => {
        return dispatch => {
            return getCompanyDeclineGL(userObject, companyID).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyDeclineGL,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyDeclineGL,
                        data: []
                    });
                }
            });
        };
    },
    getCompanyTopHospitalsForGL: (userObject, companyID, GLType) => {
        return dispatch => {
            return getCompanyTopHospitalsForGL(userObject, companyID, GLType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyTopHospitalsForGL,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyTopHospitalsForGL,
                        data: []
                    });
                }
            });
        };
    },
    getCompanyGLOvermonth: (userObject, companyID, GLType) => {
        return dispatch => {
            return getCompanyGLOvermonth(userObject, companyID, GLType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyGLOvermonth,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyGLOvermonth,
                        data: []
                    });
                }
            });
        };
    },
    getCompanyGLDashboardByType: (userObject, companyID, GLType) => {
        return dispatch => {
            return getCompanyGLDashboardByType(userObject, companyID, GLType).then(response => {
                if (response.success) {
                    dispatch({
                        type: compActions.GetCompanyGLDashboardByType,
                        data: response.data[0]
                    });
                } else {
                    dispatch({
                        type: compActions.GetCompanyGLDashboardByType,
                        data: []
                    });
                }
            });
        };
    },
}

export default compActions