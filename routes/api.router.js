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
router.delete("/cart/:id", apiController.deleteProductCart);
router.delete("/delete-all/cart", apiController.deleteAllProductCart);

module.exports = router;
