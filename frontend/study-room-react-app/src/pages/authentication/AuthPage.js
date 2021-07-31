import "./AuthPage.css";
import { useState, useContext, useEffect } from "react";
import SignUpForm from "../../components/forms/signup/SignUpForm";
import LoginForm from "../../components/forms/login/LoginForm";
import AuthOverlay from "../../components/overlays/auth/AuthOverlay";
import axios from "axios";
import { loginUser } from "../../context/authcontext/Actions";
import {
  useAuthDispatch,
  useAuthState,
} from "../../context/authcontext/Contexts";
import { openSnackBar } from "../../context/notifcontext/Actions";
import { NotifContext } from "../../context/notifcontext/Contexts";
import FormValidator from "../../utils/FormValidators";
const AuthPage = (props) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useAuthDispatch();
  const [notifState, notifDispatch] = useContext(NotifContext);
  const { loading, errorMessage } = useAuthState();
  const openSignUp = () => {
    setIsSigningUp(true);
  };
  const closeSignUp = () => {
    setIsSigningUp(false);
  };
  const [loginData, setLoginData] = useState({});

  const [signupData, setSignupData] = useState({});

  useEffect(
    () => addEnterListener(isSigningUp, onSubmitLogin, onSubmitSignUp),
    [isSigningUp, signupData, loginData]
  );

  const [signupErrors, setSignupErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const setLoginDataValue = (field, value) => {
    loginData[field] = value;
    loginErrors[field] = null;
    setLoginErrors({ ...loginErrors });
    setLoginData({ ...loginData });
  };
  const setSignupDataValue = (field, value) => {
    signupData[field] = value;
    signupErrors[field] = null;
    setSignupErrors({ ...signupErrors });
    setSignupData({ ...signupData });
  };
  const onSubmitSignUp = () => {
    const errors = FormValidator.validateSignUp(signupData);
    setSignupErrors(errors);

    if (Object.keys(errors).length > 0) return;
    axios
      .post("http://localhost:8000/users/signup", signupData)
      .then((res) =>
        openSnackBar(notifDispatch, "Welcome to StudyRoom =)", "success")
      )
      .catch((err) => {
        const errors = handleAuthRequestError(err.response, notifDispatch);
        setSignupErrors(errors);
      });
  };
  const onSubmitLogin = () => {
    const errors = FormValidator.validateLogin(loginData);
    setLoginErrors(errors);

    if (Object.keys(errors).length > 0) return;
    loginUser(dispatch, {
      email: loginData.email,
      user_name: loginData.email,
      password: loginData.password,
    })
      .then((response) => {
        openSnackBar(notifDispatch, "You are now logged in!", "success");
      })
      .catch((err) => {
        console.error(err);
        const errors = handleAuthRequestError(err.response, notifDispatch);
        setLoginErrors(errors);
      });
  };

  return (
    <div
      className={`auth-container ${isSigningUp ? "sign-up-active" : ""}`}
      id="container"
    >
      <SignUpForm
        setData={setSignupDataValue}
        onSubmit={onSubmitSignUp}
        errors={signupErrors}
      />
      <LoginForm
        setData={setLoginDataValue}
        onSubmit={onSubmitLogin}
        errors={loginErrors}
      />
      <AuthOverlay goRight={closeSignUp} goLeft={openSignUp} />
    </div>
  );
};

const handleAuthRequestError = (errorResponse, notifDispatch) => {
  let errors = {};
  if (errorResponse?.status < 500) {
    errors = errorResponse.data;
  } else if (errorResponse) {
    openSnackBar(
      notifDispatch,
      "Something bad happened :( " + errorResponse.status,
      "error"
    );
  } else {
    openSnackBar(notifDispatch, "Couldn't connect to the server :(", "error");
  }

  return errors;
};

const addEnterListener = (isSigningUp, onSubmitLogin, onSubmitSignUp) => {
  const listener = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      if (isSigningUp) onSubmitSignUp();
      else onSubmitLogin();
      event.preventDefault();
    }
  };
  document.addEventListener("keydown", listener);
  return () => {
    document.removeEventListener("keydown", listener);
  };
};

export default AuthPage;
