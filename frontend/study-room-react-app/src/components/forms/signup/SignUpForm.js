import "./SignUpForm.css";
import GradientDevider from "../../devider/GradientDevider";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordInput from "../Inputs/PasswordInput";
import SimpleInput from "../Inputs/SimpleInput";
import InputHorizontalDevider from "../../devider/InputHorizontalDevider";
import SimpleButton from "../../buttons/SimpleButton";
const SignUpForm = (props) => {
  return (
    <div className="sign-up-form-container">
      <form action="#">
        <h1>Create Account</h1>
        <GradientDevider />
        <SimpleInput placeholder="Username" />
        <div className="row-input">
          <SimpleInput className="row-input-inner" placeholder="First name" />
          <InputHorizontalDevider />
          <SimpleInput placeholder="Last name" />
        </div>
        <SimpleInput type="email" placeholder="Email" />
        <PasswordInput placeholder="Password" />
        <PasswordInput placeholder="Repeat Password" />
        <GradientDevider />
        <SimpleButton text="Sign Up" />
      </form>
    </div>
  );
};
export default SignUpForm;
