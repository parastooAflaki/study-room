import SimpleButton from "../buttons/SimpleButton";
import { useHistory } from "react-router";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import Loading from "../loading/LoadingDots";
const InvalidValidation = (props) => {
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
        <FaTimes class="success-icon" />
      </div>
      <h1 className="validation-title">Link is invalid :(</h1>
      <div className="validation-text">
        Your validation link seems to be invalid. Make sure you entered the
        right link.
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

export default InvalidValidation;
