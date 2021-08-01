import SimpleButton from "../buttons/SimpleButton";
import { useHistory } from "react-router";
import { MdTimerOff } from "react-icons/md";
import { useState } from "react";
import Loading from "../loading/LoadingDots";
const ExpiredValidation = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const onResend = () => {
    setLoading(true);
    // history.push("/auth")
  };
  return (
    <div className="validation-page-container">
      <div className="validation-logo-container">
        <svg height="100%" width="100%">
          <circle class="filling-circle" cx="50%" cy="50%" r="45%" />
        </svg>
        <MdTimerOff class="success-icon"></MdTimerOff>
      </div>
      <h1 className="validation-title">Link is expired :(</h1>
      <div className="validation-text">
        Your validation link has been expired.
      </div>
      <div className="validation-text" style={{ marginBottom: "70px" }}>
        Want us to resend the verification email?
      </div>
      {loading ? (
        <Loading />
      ) : (
        <SimpleButton text="Resend" onClick={onResend} />
      )}
    </div>
  );
};

export default ExpiredValidation;
