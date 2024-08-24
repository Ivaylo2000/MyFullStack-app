import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default styles

const triggerToast = (type, message) => {
  const options = {
    closeButton: false,
    progressBar: true,
    position: "top-center",
    autoClose: 1000, // Duration in milliseconds
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  };

  if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  }
};

export default triggerToast;
