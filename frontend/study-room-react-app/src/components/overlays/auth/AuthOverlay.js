import "./AuthOverlay.css";

const AuthOverlay = (props) => {
  return (
    <div className="auth-overlay-container">
      <div className="auth-overlay">
        <div className="auth-overlay-panel auth-overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className="ghost" id="signIn" onClick={props.goRight}>
            Sign In
          </button>
        </div>
        <div className="auth-overlay-panel auth-overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className="ghost" id="signUp" onClick={props.goLeft}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthOverlay;
