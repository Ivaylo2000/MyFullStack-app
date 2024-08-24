import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import triggerToast from "../shared/UIelemets/Toast";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    error: null,
  });

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          clearCart();
          dispatch({
            type: "SET_ERROR",
            payload: "Session expired. Please log in again.",
          });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: errorData.message || "Failed to fetch cart items.",
          });
        }
        return;
      }

      const data = await response.json();
      dispatch({ type: "SET_CART_ITEMS", payload: data.items });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch cart items." });
    }
  }, [clearCart]);

  const addToCart = useCallback(
    async (productId, quantity, showToast = true) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/cart/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId, quantity }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            clearCart();
            dispatch({
              type: "SET_ERROR",
              payload: "Session expired. Please log in again.",
            });
          } else {
            dispatch({
              type: "SET_ERROR",
              payload: errorData.message || "Failed to add item to cart.",
            });
          }
          if (showToast) {
            triggerToast(
              "error",
              errorData.message || "Failed to add item to cart."
            );
          }
          return;
        }

        await fetchCartItems();
        if (showToast) {
          triggerToast("success", "Product added to cart successfully!");
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to add item to cart." });
        if (showToast) {
          triggerToast("error", error.message);
        }
      }
    },
    [fetchCartItems, clearCart]
  );
  const removeFromCart = useCallback(
    async (productId) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/cart/remove`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            clearCart();
            dispatch({
              type: "SET_ERROR",
              payload: "Session expired. Please log in again.",
            });
          } else {
            dispatch({
              type: "SET_ERROR",
              payload: errorData.message || "Failed to remove item from cart.",
            });
          }
          return;
        }

        await fetchCartItems();
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to remove item from cart.",
        });
      }
    },
    [fetchCartItems, clearCart]
  );

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, fetchCartItems, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
