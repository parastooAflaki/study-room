import "./SignUpForm.css";
import GradientDevider from "../../devider/GradientDevider";
import PasswordInput from "../Inputs/PasswordInput";
import { useState } from "react";
import SimpleInput from "../Inputs/SimpleInput";
import InputHorizontalDevider from "../../devider/InputHorizontalDevider";
import SimpleButton from "../../buttons/SimpleButton";
import SnackBar from "../../snackbars/SnackBar";
const SignUpForm = (props) => {
  const { errors } = props;
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
          error={errors["user_name"]}
        />
        <div className="row-input">
          <SimpleInput
            className="row-input-inner"
            placeholder="First name"
            onChange={(e) => update("first_name", e)}
            error={errors["first_name"]}
          />
          <InputHorizontalDevider />
          <SimpleInput
            placeholder="Last name"
            onChange={(e) => update("last_name", e)}
            error={errors["last_name"]}
          />
        </div>
        <SimpleInput
          type="text"
          placeholder="Email"
          onChange={(e) => update("email", e)}
          error={errors["email"]}
        />
        <PasswordInput
          placeholder="Password"
          onChange={(e) => update("password", e)}
          error={errors["password"]}
        />
        <PasswordInput
          placeholder="Repeat Password"
          onChange={(e) => update("repeat_password", e)}
          error={errors["repeat_password"]}
        />
        <GradientDevider />
        <SimpleButton text="Sign Up" onClick={props.onSubmit} />
      </form>
    </div>
  );
};

export default SignUpForm;
