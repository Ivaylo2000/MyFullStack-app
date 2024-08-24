const Product = require("../models/product");
const handlerError = require("../utils/handleError");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json({
      products: products
        .map((product) => product.toObject({ getters: true }))
        .sort((a, b) => a.id - b.id),
    });
  } catch (err) {
    return handlerError("Something went wrong", 500, next);
  }
};

const getProduct = async (req, res, next) => {
  const productTitle = req.params.productTitle.replace(/-/g, " ");
  try {
    const product = await Product.findOne({ title: productTitle });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProducts,
  getProduct,
};
