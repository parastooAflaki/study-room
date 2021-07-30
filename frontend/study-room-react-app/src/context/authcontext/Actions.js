import axios from "axios";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    //TODO: read from env
    let response = await axios.post(
      `http://localhost:8000/users/login`,
      loginPayload
    );
    let data = response.data;
    // if (data.user) {
    //   dispatch({ type: "LOGIN_SUCCESS", payload: data });
    //   localStorage.setItem("currentUser", JSON.stringify(data));
    //   return data;
    // }

    return data;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
