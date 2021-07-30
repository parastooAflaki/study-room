import "./SignUpForm.css";
import GradientDevider from "../../devider/GradientDevider";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordInput from "../Inputs/PasswordInput";
import SimpleInput from "../Inputs/SimpleInput";
import InputHorizontalDevider from "../../devider/InputHorizontalDevider";
import SimpleButton from "../../buttons/SimpleButton";
const SignUpForm = (props) => {
  const update = (form, e) => {
    props.setData(form, e.target.value);
  };
  return (
    <div className="sign-up-form-container">
      <form action="#">
        <h1>Create Account</h1>
        <GradientDevider />
        <SimpleInput
          placeholder="Username"
          onChange={(e) => update("user_name", e)}
        />
        <div className="row-input">
          <SimpleInput
            className="row-input-inner"
            placeholder="First name"
            onChange={(e) => update("first_name", e)}
          />
          <InputHorizontalDevider />
          <SimpleInput
            placeholder="Last name"
            onChange={(e) => update("last_name", e)}
          />
        </div>
        <SimpleInput
          type="email"
          placeholder="Email"
          onChange={(e) => update("email", e)}
        />
        <PasswordInput
          placeholder="Password"
          onChange={(e) => update("password", e)}
        />
        <PasswordInput
          placeholder="Repeat Password"
          onChange={(e) => update("repeat_password", e)}
        />
        <GradientDevider />
        <SimpleButton text="Sign Up" onClick={props.onSubmit} />
      </form>
    </div>
  );
};
export default SignUpForm;
