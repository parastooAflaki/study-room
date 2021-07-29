import "./AuthPage.css";
import { useState } from "react";
import SignUpForm from "../../components/forms/signup/SignUpForm";
import LoginForm from "../../components/forms/login/LoginForm";
import AuthOverlay from "../../components/overlays/auth/AuthOverlay";
import axios from "axios";
const AuthPage = (props) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const openSignUp = () => {
    setIsSigningUp(true);
  };
  const closeSignUp = () => {
    setIsSigningUp(false);
  };
  const [loginData, setLoginData] = useState({});
  const [signupData, setSignupData] = useState({});

  const onSubmitSignUp = () => {};
  return (
    <div
      className={`auth-container ${isSigningUp ? "sign-up-active" : ""}`}
      id="container"
    >
      <SignUpForm setData={setSignupData} onSubmit={onSubmitSignUp} />
      <LoginForm setData={setLoginData} />
      <AuthOverlay goRight={closeSignUp} goLeft={openSignUp} />
    </div>
  );
};
export default AuthPage;
