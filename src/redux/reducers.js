import auth from './auth/reducer';
import accountmanagers from './accountmanagers/reducer';
import claimmanagers from './claimmanagers/reducer';
import company from './company/reducer';
import patient from './patient/reducer';
import clinic from './clinic/reducer';
import diagnosis from './diagnosis/reducer';
import utilities from './utilities/reducer';
import reports from './reports/reducer';
import contactcenter from './contactcenter/reducer';
import escalations from './medicalescalations/reducer';
import themeChanger from './themeChanger/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import themeSetting from './themeSettings/reducer';
import scrumboard from './scrumboard/reducer';
import alertescalations from "./alertescalations/reducer";
import account from "./account/reducer";
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        account,
        accountmanagers,
        claimmanagers,
        company,
        patient,
        reports,
        escalations,
        diagnosis,
        clinic,
        contactcenter,
        themeChanger,
        LanguageSwitcher,
        utilities,
        themeSetting,
        scrumboard,
        alertescalations,
        router: routerReducer,
        ...asyncReducers
    });

export default createReducer;