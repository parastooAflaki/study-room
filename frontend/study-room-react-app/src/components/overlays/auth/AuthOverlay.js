import "./AuthOverlay.css";
import SimpleButton from "../../buttons/SimpleButton";
const AuthOverlay = (props) => {
  return (
    <div className="auth-overlay-container">
      <div className="auth-overlay">
        <div className="auth-overlay-panel auth-overlay-left">
          <h1>Already have an account?</h1>
          <p>Then let's login and study hard!</p>
          <SimpleButton
            ghost
            text="Login to existing account"
            onClick={props.goRight}
          />
        </div>
        <div className="auth-overlay-panel auth-overlay-right">
          <h1>New to StudyRoom?</h1>
          <p>Come make an account real easy and fast!</p>
          <SimpleButton
            text="Create new account"
            ghost
            onClick={props.goLeft}
          />
        </div>
      </div>
    </div>
  );
};
export default AuthOverlay;
