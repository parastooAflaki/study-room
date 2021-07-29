import "./Inputs.css";

const SimpleInput = (props) => {
  return (
    <input
      className="text-input"
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      type={props.type ? props.type : "text"}
    />
  );
};
export default SimpleInput;
