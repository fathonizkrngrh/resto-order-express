var express = require("express");
var router = express.Router();
const apiController = require("../controllers/api/api.controller");

/* category */
router.get("/category", apiController.getProductByCategory);

// Product
router.get("/product/:id", apiController.getDetailProductById);
router.get("/popular-product", apiController.getProductPopular);

// Cart
router.post("/cart/:id", apiController.addToCart);
router.get("/cart", apiController.getCartProduct);

module.exports = router;
