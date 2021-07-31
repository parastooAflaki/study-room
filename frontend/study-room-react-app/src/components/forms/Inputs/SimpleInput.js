import "./Inputs.css";
import StringUtils from "../../../utils/StringUtils";
const SimpleInput = (props) => {
  return (
    <div className="input-container">
      <input
        className={"text-input " + (props.error ? "error" : "")}
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={props.type ? props.type : "text"}
      />
      {props.error && (
        <div className="input-error-tooltip">
          {StringUtils.capitalizeFirstLetter(props.error)}
        </div>
      )}
    </div>
  );
};
export default SimpleInput;
