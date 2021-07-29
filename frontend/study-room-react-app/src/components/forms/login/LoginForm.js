import "./LoginForm.css";
import GradientDevider from "../../devider/GradientDevider";
import SimpleInput from "../Inputs/SimpleInput";
import PasswordInput from "../Inputs/PasswordInput";
import SimpleButton from "../../buttons/SimpleButton";
const LoginForm = (props) => {
  return (
    <div className="login-form-container">
      <form action="#">
        <h1>Login</h1>
        <GradientDevider />
        <SimpleInput type="email" placeholder="Email" />
        <PasswordInput placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <GradientDevider />
        <SimpleButton text="Login" />
      </form>
    </div>
  );
};
export default LoginForm;
