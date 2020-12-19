const utiliesAction = {
  UPDATELOADING: "UPDATELOADING",
  UPDATESESSIONTIMEOUTMESSAGE: "UPDATESESSIONTIMEOUTMESSAGE",

  updateLoading: loading => {
    return {
      type: utiliesAction.UPDATELOADING,
      data: loading
    };
  },
  updateSessionTimeoutMessage: show => {
    return {
      type: utiliesAction.UPDATESESSIONTIMEOUTMESSAGE,
      data: show
    };
  }
};

export default utiliesAction;
