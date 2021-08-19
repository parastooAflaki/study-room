import SimpleButton from "../buttons/SimpleButton";
import { useHistory } from "react-router";
import { MdTimerOff } from "react-icons/md";
import { useState, useContext } from "react";
import Loading from "../loading/LoadingDots";
import SimpleInput from "../forms/Inputs/SimpleInput";
import { NotifContext } from "../../context/notifcontext/Contexts";
import { openSnackBar } from "../../context/notifcontext/Actions";
import axios from "axios";
const ExpiredValidation = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [notifState, notifDispatch] = useContext(NotifContext);
  const updateEmail = (e) => {
    setEmail(e.target.value);
    setError(null);
  };
  const onResend = () => {
    if (!email || email.length == 0) {
      setError("Email can't be empty.");
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:8000/users/revalidate/" + email)
      .then((res) => {
        openSnackBar(notifDispatch, res.data, "success");
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        setError(errorMessage);
        setLoading(false);
      });
  };
  return (
    <div className="validation-page-container">
      <div className="validation-logo-container">
        <svg className="validation-svg" height="100%" width="100%">
          <circle className="filling-circle" cx="50%" cy="50%" r="45%" />
        </svg>
        <MdTimerOff className="success-icon"></MdTimerOff>
      </div>
      <h1 className="validation-title">Link is expired :(</h1>
      <div className="validation-text">
        Your validation link has been expired.
      </div>
      <div className="validation-text" style={{ marginBottom: "70px" }}>
        Want us to resend the verification email?
      </div>
      <div>Please enter your email</div>
      <SimpleInput
        placeholder="email"
        className="resendmail-input"
        onChange={updateEmail}
        error={error}
      />
      {loading ? (
        <Loading />
      ) : (
        <SimpleButton text="Resend" onClick={onResend} />
      )}
    </div>
  );
};

export default ExpiredValidation;
