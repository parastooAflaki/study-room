import { Children } from "react";
import "./SimpleCard.css";
function SimpleCard(props) {
  const { children, minHeight = "500px", width = "50%", className} = props;
  return <div className={`simplecard ${className}`} style={{minHeight, width}}>
      {children}
  </div>;
}

export default SimpleCard;
