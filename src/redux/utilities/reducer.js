import utilitiesAction from "./actions";

const initState = {
  loading: false,
  showSessionTimeoutMessage: false
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case utilitiesAction.UPDATELOADING:
      return {
        ...state,
        loading: action.data
      };
    case utilitiesAction.UPDATESESSIONTIMEOUTMESSAGE:
      return {
        ...state,
        showSessionTimeoutMessage: action.data
      };
    default:
      return state;
  }
}
