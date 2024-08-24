import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./pages/Home/Home";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { CartProvider } from "./Context/CartContext";
import { ToastContainer } from "react-toastify";

const Products = React.lazy(() => import("./pages/Products/Products"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const ProductPage = React.lazy(() =>
  import("./pages/SingleProduct/ProductPage")
);
const Login = React.lazy(() => import("./pages/Users/Login"));
const Signup = React.lazy(() => import("./pages/Users/Signup"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage/ErrorPage"));

const App = () => {
  return (
    <Router>
      <CartProvider>
        <MainNavigation />
        <main>
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products/:productTitle" element={<ProductPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </main>
      </CartProvider>
      <ToastContainer />
    </Router>
  );
};

export default App;
