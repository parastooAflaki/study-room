import "./AuthPage.css";
import { useState, useContext } from "react";
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
  const setLoginDataValue = (field, value) => {
    loginData[field] = value;
    setLoginData({ ...loginData });
  };
  const setSignupDataValue = (field, value) => {
    signupData[field] = value;
    setSignupData({ ...signupData });
  };
  const onSubmitSignUp = () => {
    openSnackBar(notifDispatch, "AAAAA", "info");
    axios
      .post("http://localhost:8000/users/signup", signupData)
      .then((res) => alert(JSON.stringify(res.data)));
    // .catch((err) => alert(err));
  };
  const onSubmitLogin = () => {
    loginUser(dispatch, {
      email: loginData.email,
      user_name: loginData.email,
      password: loginData.password,
    })
      .then((response) => {
        if (response) {
          alert("AAAAAAAAAA " + response);
          props.history.push("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className={`auth-container ${isSigningUp ? "sign-up-active" : ""}`}
      id="container"
    >
      <SignUpForm setData={setSignupDataValue} onSubmit={onSubmitSignUp} />
      <LoginForm setData={setLoginDataValue} onSubmit={onSubmitLogin} />
      <AuthOverlay goRight={closeSignUp} goLeft={openSignUp} />
    </div>
  );
};
export default AuthPage;
