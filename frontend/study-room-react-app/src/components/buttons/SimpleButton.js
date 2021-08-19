import "./Buttons.css";
const SimpleButton = (props) => {
  return (
    <button
      className={`simple-button ${props.ghost ? "ghost" : ""}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
export default SimpleButton;
