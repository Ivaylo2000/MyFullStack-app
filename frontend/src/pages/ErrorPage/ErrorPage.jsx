import Button from "../../shared/UIelemets/Button";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <div className="errorPageWrapper">
      <h1>Sorry</h1>
      <p>the page you were looking for could not be found.</p>
      <Button text="RETURN TO HOMEPAGE" onClick={handleButtonClick} />
    </div>
  );
};

export default ErrorPage;
