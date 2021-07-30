import "./SnackBar.css";
const SnackBar = (props) => {
  return (
    <div className={"snackbar " + (props.open ? "active " : "") + props.mode}>
      <div>{props.message}</div>
      <div className="close" onClick={props.onClose}></div>
    </div>
  );
};
export default SnackBar;
