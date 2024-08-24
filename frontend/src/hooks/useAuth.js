import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import triggerToast from "../shared/UIelemets/Toast";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const useAuth = (url, onSuccessRedirect) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { clearCart, fetchCartItems } = useContext(CartContext);

  const authRequestHandler = useCallback(
    async (event) => {
      event.preventDefault();

      if (!email.trim() || !password.trim()) {
        triggerToast("error", "All fields are required.");
        return;
      }

      if (!validateEmail(email)) {
        triggerToast("error", "Please enter a valid email address.");
        return;
      }

      setError("");

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          triggerToast("error", errorData.message);
          setError(errorData.message);
          return;
        }

        triggerToast("success", "Success!");
        clearCart();
        fetchCartItems();
        navigate(onSuccessRedirect);
      } catch (error) {
        triggerToast("error", error.message);
        setError(error.message);
      }
    },
    [
      email,
      password,
      url,
      navigate,
      onSuccessRedirect,
      clearCart,
      fetchCartItems,
    ]
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    authRequestHandler,
  };
};

export default useAuth;
