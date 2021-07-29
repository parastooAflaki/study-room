import "./LoginForm.css";

const LoginForm = (props) => {
  return (
    <div className="login-form-container">
      <form action="#">
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};
export default LoginForm;
