const express = require("express");
const cartController = require("../controllers/cart-controller");
const authenticateUser = require("../utils/auth-middleware");

const router = express.Router();

router.post("/add", authenticateUser, cartController.addToCart);
router.post("/remove", authenticateUser, cartController.removeFromCart);
router.get("/", authenticateUser, cartController.getCartItems);

module.exports = router;
