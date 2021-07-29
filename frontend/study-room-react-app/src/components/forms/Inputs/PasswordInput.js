import "./Inputs.css";
import GradientDevider from "../../devider/GradientDevider";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="password-container">
      <input
        className="password-input"
        type={show ? "text" : "password"}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      {show ? (
        <FiEye className="password-eye" onClick={() => setShow(false)} />
      ) : (
        <FiEyeOff className="password-eye" onClick={() => setShow(true)} />
      )}
    </div>
  );
};
export default PasswordInput;
