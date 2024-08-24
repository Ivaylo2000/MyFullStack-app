import ImageSlider from "../../../shared/components/ImageSlider/ImageSlider";
import Button from "../../../shared/UIelemets/Button";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";
import { useRef } from "react";
import "./ProductDetails.css";

const ProductDetails = ({ productDetails }) => {
  const { addToCart } = useContext(CartContext);

  const inputRef = useRef(null);

  const getInputValue = () => {
    return Number(inputRef.current.value);
  };

  return (
    <div className="productContainer">
      <div className="imagesHolder">
        <ImageSlider images={productDetails.images} />
      </div>
      <div className="productInformation">
        <span>{productDetails.category}</span>
        <h2>{productDetails.title}</h2>

        <div className="quantitySelector">
          <p>Quantity</p>
          <input type="number" defaultValue={1} ref={inputRef} />
        </div>
        <div className="priceInfo">
          <p>Price:</p>
          <span> {productDetails.price} $ </span>
        </div>
        <Button
          className={"addToCartButton"}
          text={"ADD TO CART"}
          onClick={() => addToCart(productDetails._id, getInputValue())}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
