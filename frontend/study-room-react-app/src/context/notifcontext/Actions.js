export const openSnackBar = (dispatch, message, mode) => {
  dispatch({ type: "OPEN_SNACK", snackMessage: message, snackMode: mode });
  setTimeout(() => dispatch({ type: "CLOSE_SNACK" }), 5000);
};

export const closeSnackBar = (dispatch) => {
  dispatch({ type: "CLOSE_SNACK" });
};
