import "./ErrorMessage.css";
const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <h2>{message}</h2>
    </div>
  );
};

export default ErrorMessage;
