import "./SnackBar.css";
import { AiFillCloseCircle } from "react-icons/ai";
const SnackBar = (props) => {
  return (
    <div className={"snackbar " + (props.open ? "active " : "") + props.mode}>
      <div>{props.message}</div>
      <AiFillCloseCircle className="close" onClick={props.onClose} />
    </div>
  );
};
export default SnackBar;
