export const notifReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_SNACK":
      return {
        ...state,
        snackOpen: true,
        snackMessage: action.snackMessage,
        snackMode: action.snackMode,
      };
    case "CLOSE_SNACK":
      return {
        ...state,
        snackOpen: false,
      };
    default:
      return state;
  }
};

export const notifInitialState = {
  snackOpen: false,
};
