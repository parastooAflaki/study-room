import SimpleButton from "../buttons/SimpleButton";
import { useHistory } from "react-router";
import { BsCheck } from "react-icons/bs";
const SuccessValidation = (props) => {
  const history = useHistory();

  return (
    <div className="validation-page-container">
      <div className="validation-logo-container">
        <svg height="100%" width="100%">
          <circle class="filling-circle" cx="50%" cy="50%" r="45%" />
        </svg>
        <BsCheck class="success-icon"></BsCheck>
      </div>
      <h1 className="validation-title">Welcome to StudyRoom</h1>
      <div className="validation-text">
        Your account has been successfully validated.
      </div>
      <div className="validation-text" style={{ marginBottom: "70px" }}>
        Head over to login page to get inside =)
      </div>
      <SimpleButton text="To login" onClick={() => history.push("/auth")} />
    </div>
  );
};

export default SuccessValidation;
