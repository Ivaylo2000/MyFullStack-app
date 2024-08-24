import "./CartItems.css";
import ErrorMessage from "../../../shared/components/ErrorMessage/ErrorMesage";
import { CartContext } from "../../../Context/CartContext";
import { useContext, useEffect } from "react";
import Button from "../../../shared/UIelemets/Button";

const CartItems = () => {
  const { cartItems, addToCart, removeFromCart, fetchCartItems, error } =
    useContext(CartContext);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const calculateTotal = (price, quantity) => price * quantity;

  const grandTotal = cartItems.reduce(
    (total, item) => total + calculateTotal(item.product.price, item.quantity),
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (error) return <ErrorMessage message={error} />;

  if (cartItems.length === 0)
    return <ErrorMessage message="Your cart is empty" />;

  return (
    <>
      <h1 className="cartHeader"> Cart</h1>
      <div className="cartContainer">
        <div className="cart-container">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.product.id} className="listItem">
                <div className="listImageHolder">
                  <img src={item.product.images} alt={item.product.title} />
                </div>
                <div className="productDetails">
                  <p className="productCategory">Sweatshirt</p>
                  <p className="productTitle">{item.product.title}</p>
                  <p className="productPrice">
                    <b>Price:</b> {item.product.price.toFixed(2)} $
                  </p>
                  <div className="quantity-total-price">
                    <div className="qunatityHolder">
                      <Button
                        className={"remove-button"}
                        text={"-"}
                        onClick={() => removeFromCart(item.product._id)}
                      />
                      <p className="productQuantity"> {item.quantity}</p>
                      <Button
                        className={"remove-button"}
                        text={"+"}
                        onClick={() => addToCart(item.product._id, 1, false)}
                      />
                    </div>
                    <p className="productTotalPrice">
                      <b> Total: </b>
                      {calculateTotal(
                        item.product.price,
                        item.quantity
                      ).toFixed(2)}{" "}
                      $
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-summary">
          <div className="summary-item">
            <span className="summary-label">Total Quantity: </span>
            <span className="summary-value">{totalQuantity}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Grand Total:</span>
            <span className="summary-value">{grandTotal.toFixed(2)} $</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
