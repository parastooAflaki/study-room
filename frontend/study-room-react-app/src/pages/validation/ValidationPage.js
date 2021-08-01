import "./ValidationPage.css";
import { useParams } from "react-router";
import SimpleCard from "../../components/cards/SimpleCard";
import SuccessValidation from "../../components/validations/SuccessValidation";
import ExpiredValidation from "../../components/validations/ExpiredValidation";
import InvalidValidation from "../../components/validations/InvalidValidation";
const ValidationPage = (props) => {
  const { status } = useParams();

  return <SimpleCard>{getComponentByStatus(status)}</SimpleCard>;
};

const getComponentByStatus = (status) => {
  switch (status) {
    case "success":
      return <SuccessValidation />;

    case "invalid":
      return <InvalidValidation />;

    case "expired":
      return <ExpiredValidation />;
  }
};
export default ValidationPage;
