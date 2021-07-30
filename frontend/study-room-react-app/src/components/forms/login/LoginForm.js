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
        <SimpleInput
          type="email"
          placeholder="Email"
          onChange={(e) => props.setData("email", e.target.value)}
        />
        <PasswordInput
          placeholder="Password"
          onChange={(e) => props.setData("password", e.target.value)}
        />
        <a href="#">Forgot your password?</a>
        <GradientDevider />
        <SimpleButton text="Login" onClick={props.onSubmit} />
      </form>
    </div>
  );
};
export default LoginForm;
