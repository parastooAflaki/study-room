import "./AuthPage.css";
import { useState } from "react";
import SignUpForm from "../../components/forms/signup/SignUpForm";
import LoginForm from "../../components/forms/login/LoginForm";
import AuthOverlay from "../../components/overlays/auth/AuthOverlay";
import axios from "axios";
import { loginUser } from "../../context/Actions";
import { useAuthDispatch, useAuthState } from "../../context/Contexts";
const AuthPage = (props) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  const openSignUp = () => {
    setIsSigningUp(true);
  };
  const closeSignUp = () => {
    setIsSigningUp(false);
  };
  const [loginData, setLoginData] = useState({});
  const [signupData, setSignupData] = useState({});
  const setLoginDataValue = (field, value) => {
    loginData[field] = value;
    setLoginData({ ...loginData });
  };
  const onSubmitSignUp = () => {};
  const onSubmitLogin = () => {
    loginUser(dispatch, {
      email: loginData.email,
      password: loginData.password,
    })
      .then((response) => {
        alert("AAAAAAAAAA " + response);
        props.history.push("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div
      className={`auth-container ${isSigningUp ? "sign-up-active" : ""}`}
      id="container"
    >
      <SignUpForm setData={setSignupData} onSubmit={onSubmitSignUp} />
      <LoginForm setData={setLoginDataValue} onSubmit={onSubmitLogin} />
      <AuthOverlay goRight={closeSignUp} goLeft={openSignUp} />
    </div>
  );
};
export default AuthPage;
