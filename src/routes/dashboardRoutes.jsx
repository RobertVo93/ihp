import Intro from "views/Intro";
import AccountManagerDashboard from "views/pages/accountmanagers/Dashboard";
import AMViewClaims from "views/pages/accountmanagers/ViewClaims";
import ClaimManagerDashboard from "views/pages/claimmanagers/Dashboard";
import InsurerDashboard from "views/pages/insurer/Dashboard";
import CompanyDashboard from "views/pages/company/Dashboard";
import CompanyProductivity from "views/pages/company/Productivity";
import CompanyBreakdown from "views/pages/company/Breakdown";
import CompanyProfileInpatient from "views/pages/company/profiles/Inpatient";
import CompanyProfileOutpatientGP from "views/pages/company/profiles/OutpatientGP";
import CompanyProfileOutpatientSP from "views/pages/company/profiles/OutpatientSP";
import CompanyRedirect from "components/company/CompanyRedirect";
import PatientRedirect from "components/patient/PatientRedirect";
import PatientDashboard from "views/pages/patient/Dashboard";
import DiagnosisRedirect from "components/diagnosis/DiagnosisRedirect";
import DiagnosisDashboard from "views/pages/diagnosis/Dashboard";
import ClinicRedirect from "components/clinic/ClinicRedirect";
import ClinicDashboard from "views/pages/clinic/Dashboard";
import EarlyWarningDashboard from "views/pages/earlywarning/Dashboard";
import ReportsGeneratePage from "views/pages/reports/Generate";
import MedicalEscalationsDashboard from "views/pages/medicalescalations/Dashboard";
import CompanyHRDashboard from "views/pages/companyhr/Dashboard";
import OrdersAllPage from "views/pages/contactcenter/OrdersPage";
import AlertEscalationsDashboard from "views/pages/alertescalations/Dashboard";
import CompanyList from "components/company/lists/CompanyList";
import StatisticsDashboard from "views/pages/company/glstatistics/Dashboard";
import InitialGL  from "views/pages/company/glstatistics/InitialGL";
import DeclineGL  from "views/pages/company/glstatistics/DeclineGL";
import FinalGL from "views/pages/company/glstatistics/FinalGL";
import AccountManagement from "views/pages/account/AccountManagement";
import WhiteLabelSettings from "views/pages/account/WhiteLabelSettings";
import RoleManagement from "views/pages/account/RoleManagement";

const dashboardRoutes = [
	{ path: "/intro", component: Intro },
	{ path: "/am-dashboard", component: AccountManagerDashboard },
	{ path: "/am-view-claims", component: AMViewClaims },
	{ path: "/cm-dashboard", component: ClaimManagerDashboard },
	{ path: "/insurer-dashboard", component: InsurerDashboard },
	{ path: "/company/cmoverview/:companyID/:redirectTo", component: CompanyRedirect },
	{ path: "/company/cmoverview", component: CompanyDashboard },
	{ path: "/company/cmproductivity", component: CompanyProductivity },
	{ path: "/company/cmbreakdown", component: CompanyBreakdown },
	{ path: "/company/cmprofiles/inpatient", component: CompanyProfileInpatient },
	{ path: "/company/cmprofiles/gpoutpatient", component: CompanyProfileOutpatientGP },
    { path: "/company/cmprofiles/spoutpatient", component: CompanyProfileOutpatientSP },
    { path: "/company/glstatistics/cmoverview", component: StatisticsDashboard },
    { path: "/company/glstatistics/initial-gl", component: InitialGL },
    { path: "/company/glstatistics/decline-gl", component: DeclineGL },
    { path: "/company/glstatistics/final-gl", component: FinalGL },
	{ path: "/patient/route/:patientID/:redirectTo", component: PatientRedirect },
	{ path: "/patient/cmoverview", component: PatientDashboard },
	{ path: "/clinic/route/:clinicID/:redirectTo", component: ClinicRedirect },
	{ path: "/clinic/cmoverview", component: ClinicDashboard },
	{ path: "/diagnosis/route/:diagnosisID/:redirectTo", component: DiagnosisRedirect },
	{ path: "/diagnosis/cmoverview", component: DiagnosisDashboard },
	{ path: "/medical_escalations/all", component: MedicalEscalationsDashboard },
	{ path: "/early-warning", component: EarlyWarningDashboard },
	{ path: "/reports/generate", component: ReportsGeneratePage },
	{ path: "/under_construction", component: Intro },
	{ path: "/company-dashboard", component: CompanyHRDashboard },
	{ path: "/orders/all", component: OrdersAllPage },
	{ path: "/alert-escalations", component: AlertEscalationsDashboard },
	{ path: "/company-list", component: CompanyList },
	{ path: "/company-list", component: CompanyList },
	{ path: "/account/management", component: AccountManagement },
	{ path: "/account/whitelabelsettings", component: WhiteLabelSettings },
	{ path: "/account/roles", component: RoleManagement },
];

export default dashboardRoutes;


