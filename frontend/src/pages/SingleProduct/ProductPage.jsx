import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import { useFetchProducts } from "../../hooks/useFetchProducts";

const ProductPage = () => {
  const { productTitle } = useParams();
  const { data, error } = useFetchProducts(
    `${process.env.REACT_APP_BACKEND_URL}/products/${productTitle}`
  );

  const product = data ? data.product : null;
  if (!product) return;
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <ProductDetails productDetails={product} />
    </>
  );
};

export default ProductPage;
