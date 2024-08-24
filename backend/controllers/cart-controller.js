const Cart = require("../models/cart");
const handleError = require("../utils/handleError");

const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity) {
    return handleError("Product ID and quantity are required.", 400, next);
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart." });
  } catch (err) {
    return handleError(
      "Adding item to cart failed, please try again.",
      500,
      next
    );
  }
};
const removeFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;

  if (!productId) {
    return handleError("Product ID is required.", 400, next);
  }

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return handleError("Cart not found.", 404, next);
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (productIndex === -1) {
      return handleError("Product not found in cart.", 404, next);
    }

    const product = cart.items[productIndex];
    product.quantity -= 1;

    if (product.quantity <= 0) {
      cart.items.splice(productIndex, 1);
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );
    res
      .status(200)
      .json({ message: "Item removed from cart.", cart: updatedCart });
  } catch (err) {
    return handleError(
      "Removing item from cart failed, please try again.",
      500,
      next
    );
  }
};

const getCartItems = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return handleError("Your cart is empty.", 404, next);
    }

    res.status(200).json({ items: cart.items });
  } catch (err) {
    return handleError(
      "Fetching cart items failed, please try again.",
      500,
      next
    );
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCartItems,
};
