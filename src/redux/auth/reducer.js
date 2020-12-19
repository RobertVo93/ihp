import authAction from './actions'

const initState = {
    isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') === 'true' : false,
    accessToken: localStorage.getItem('accessToken'),
    userID: localStorage.getItem('userID'),
    permissions: JSON.parse(localStorage.getItem('permissions')),
    route: localStorage.getItem('initialRoute'),
    allowedRoutes: JSON.parse(localStorage.getItem('allowedRoutes')),
    companyMap: JSON.parse(localStorage.getItem('companyMap')),
    subColor: JSON.parse(localStorage.getItem('subColor')),
    logo: JSON.parse(localStorage.getItem('logo')),
    logo_mime: JSON.parse(localStorage.getItem('logo_mime')),
    mainColor: JSON.parse(localStorage.getItem('mainColor')),
    forgotPasswordEmail: ''
}


export default function rootReducer(state = initState, action) {

    switch (action.type) {

        case authAction.LOGIN:

            return {
                ...state,
                isLogin: action.isLogin,
                userID: action.userID,
                accessToken: action.accessToken,
                permissions: action.permissions,
                allowedRoutes: action.allowedRoutes,
                route: action.route,
                companyMap: action.companyMap,
                subColor: action.subColor,
                logo: action.logo,
                logo_mime: action.logo_mime,
                mainColor: action.mainColor,
            }
        case authAction.LOGOUT:
            return {
                ...state,
                isLogin: false,
                userID: null,
                accessToken: null,
                permissions: null,
                allowedRoutes: null,
                route: null,
                subColor: null,
                logo: null,
                logo_mime: null,
                mainColor: null,
            }
        case authAction.FORGOTPASSWORDEMAIL:
            return {
                ...state,
                forgotPasswordEmail: action.data
            }
        case authAction.REGETJWTTOKEN:
            return {
                ...state,
                accessToken: action.accessToken
            }
        default:
            return state
    }
}