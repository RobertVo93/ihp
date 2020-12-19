import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import createReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Axios from "axios";
import authActions from "./auth/actions";
import utiliesAction from "./utilities/actions";

let noRequest = 0, //number of current requests
  maxNoRequest = 0; //max number of requests in a turn
//The flag to identify that begin new calling API request turn. when all requests of this turn are completed => flag = false.
let startNewTurn = true;
const interceptor = store => {
  Axios.interceptors.request.use(
    conf => {
      let appState = store.getState();
      noRequest++;
      maxNoRequest++;
      if (appState.utilities && !appState.utilities.loading && startNewTurn) {
        //if new turn is established => show loading
        store.dispatch(utiliesAction.updateLoading(true));
        startNewTurn = false;
      }
      if (!conf.headers["Authorization"] && appState.auth) {
        //add JWT token to request header
        conf.headers["Authorization"] = `Bearer ${appState.auth.accessToken}`;
      }

      //add set-cookie to axios request
      conf.withCredentials = true;
      return conf;
    },
    error => {
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    next => {
      let appState = store.getState();
      noRequest--;
      if (
        appState.utilities &&
        appState.utilities.loading &&
        noRequest <= maxNoRequest * 0.6
      ) {
        //if at least 40% of requests are completed (uncompleted requests is less than 60%) => hide loading
        store.dispatch(utiliesAction.updateLoading(false));
      }
      if (noRequest === 0) {
        //if all requests are completed
        startNewTurn = true; //next time calling api is a new turn
        if (appState.auth) {
          //reget JWT Token. If user is not active too long, the token will be expired
          store.dispatch(authActions.regetJWTToken(appState.auth.accessToken));
        }
      }
      return Promise.resolve(next);
    },
    error => {
      let appState = store.getState();
      noRequest--;
      if (
        appState.utilities &&
        appState.utilities.loading &&
        noRequest <= maxNoRequest * 0.6
      ) {
        //if at least 40% of requests are completed (uncompleted requests is less than 60%) => hide loading
        store.dispatch(utiliesAction.updateLoading(false));
      }
      if (noRequest === 0) {
        //if all requests are completed
        startNewTurn = true; //next time calling api is a new turn
        if (error.response && error.response.status === 403) {
          //Session timeout. Token decode failure!
          //Show message [Oops! You have been inactive for 30 minutes, we have logged you out due to security reasons. Please login again.]
          store.dispatch(utiliesAction.updateSessionTimeoutMessage(true));
        }
        else if (appState.auth) {
          //reget JWT Token. If user is not active too long, the token will be expired
          store.dispatch(authActions.regetJWTToken(appState.auth.accessToken));
        }
      }
      return Promise.reject(error);
    }
  );
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["scrumboard", "themeSetting", "LanguageSwitcher", "themeChanger"]
};
const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, routeMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, createReducer());
const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
interceptor(store);
const persistor = persistStore(store);

export { store, history, persistor };
