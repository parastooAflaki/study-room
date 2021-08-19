import "./Inputs.css";
import GradientDevider from "../../devider/GradientDevider";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
const PasswordInput = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="password-container">
      <input
        className={"password-input " + (props.error ? "error" : "")}
        type={show ? "text" : "password"}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      {show ? (
        <FiEye className="password-eye" onClick={() => setShow(false)} />
      ) : (
        <FiEyeOff className="password-eye" onClick={() => setShow(true)} />
      )}
      {props.error && <div className="input-error-tooltip">{props.error}</div>}
    </div>
  );
};
export default PasswordInput;
