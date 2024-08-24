import ClothesContainer from "./components/ClothesContainer";
import Select from "../../shared/UIelemets/Select";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import ErrorMessage from "../../shared/components/ErrorMessage/ErrorMesage";
import { useState } from "react";
import "./Products.css";

const Products = () => {
  const [selectedValue, setSelectedValue] = useState("ALL");
  const { data, error } = useFetchProducts(
    `${process.env.REACT_APP_BACKEND_URL}/products`
  );

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const products = data ? data.products : [];
  if (error) return <ErrorMessage message={error} />;
  if (products.length === 0) return <ErrorMessage message="Loading..." />;

  return (
    <div className="productsContainer">
      <Select
        values={["ALL", "Sweatshirt", "Shorts", "T-Shirt", "Joggers", "Cap"]}
        onChange={handleSelectChange}
      />
      <ClothesContainer products={products} selectedCategory={selectedValue} />
    </div>
  );
};
export default Products;
