import "./AuthPage.css";
import { useState } from "react";
import SignUpForm from "../../components/forms/signup/SignUpForm";
import LoginForm from "../../components/forms/login/LoginForm";
import AuthOverlay from "../../components/overlays/auth/AuthOverlay";

const AuthPage = (props) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const openSignUp = () => {
    setIsSigningUp(true);
  };
  const closeSignUp = () => {
    setIsSigningUp(false);
  };
  return (
    <div
      className={`auth-container ${isSigningUp ? "sign-up-active" : ""}`}
      id="container"
    >
      <SignUpForm />
      <LoginForm />
      <AuthOverlay goRight={closeSignUp} goLeft={openSignUp} />
    </div>
  );
};
export default AuthPage;
