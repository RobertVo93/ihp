import Layout from "layouts/DashboardLayout.jsx";
import CreateNewPassword from "views/pages/account/CreateNewPassword";
import Newpassword from "views/pages/account/Newpassword";
import Resetpassword from "views/pages/account/Resetpassword";
import Updatepassword from "views/pages/account/UpdatePassword";
import {
    LockScreen,
    Login,
    Register,
    OTPScreen,
    Error400,
    ForgotPassword,
    ForgotPasswordCompletion,
    Error500,
    PricingStyle1,
    PricingStyle2
} from "./../views/pages/index";

const indexRoutes = [
    { path: "/pricing/style1", component: PricingStyle1 },
    { path: "/pricing/style2", component: PricingStyle2 },
    { path: "/lockscreen", component: LockScreen },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/otpscreen", component: OTPScreen },
    { path: "/error400", component: Error400 },
    { path: "/error500", component: Error500 },
    { path: "/forgotPassword", component: ForgotPassword },
    { path: "/forgotpasswordcompletion", component: ForgotPasswordCompletion },
    { path: "/resetpassword/:token", component: Resetpassword },
    { path: "/newpassword/:token", component: Newpassword },
    { path: "/updatepassword", component: Updatepassword },
    { path: "/createnewpassword", component: CreateNewPassword },
    { path: "/", component: Layout }
];

export default indexRoutes;
