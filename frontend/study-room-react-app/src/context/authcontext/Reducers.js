import React, { useReducer } from "react";
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      if (action.status && action.status === 403)
        return {
          ...initialState,
          loading: false,
          errorMessage: "حساب کاربری شما هنوز تایید نشده‌است",
        };
      else if (action.status && action.status < 500)
        return {
          ...initialState,
          loading: false,
          errorMessage: "ايميل يا پسورد وارد شده نادرست است",
        };
      return {
        ...initialState,
        loading: false,
        errorMessage: "مشکلی رخ داده است",
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
