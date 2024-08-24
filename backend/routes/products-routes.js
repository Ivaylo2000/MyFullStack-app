const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
} = require("../controllers/products-controller");

router.get("/", getProducts);
router.get("/:productTitle", getProduct);
module.exports = router;
