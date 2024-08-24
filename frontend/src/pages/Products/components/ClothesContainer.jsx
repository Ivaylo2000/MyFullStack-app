import "./ClothesContainer.css";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../../../shared/components/ImageSlider/ImageSlider";

const ClothesContainer = ({ selectedCategory, products }) => {
  const navigate = useNavigate();

  const handleImageClick = (title) => {
    const productTitle = title.replace(/ /g, "-");

    navigate(`/products/${productTitle}`);
  };

  const getProductsToDisplay = () =>
    selectedCategory === "ALL"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <ul className="clothesListContainer">
      {getProductsToDisplay().map((product) => (
        <li key={product.id}>
          <ImageSlider
            images={product.images}
            handleImageClick={() => handleImageClick(product.title)}
            cursorPointer={true}
            alt={product.title}
          />
          <div>
            <h3>{product.title}</h3>
            <h4>{product.price} $</h4>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ClothesContainer;
