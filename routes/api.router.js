var express = require("express");
var router = express.Router();
const productC = require("../controllers/api/product.controller");
const orderC = require("../controllers/api/order.controller");
const cartC = require("../controllers/api/cart.controller");

/* category */
router.get("/category", productC.getProductByCategory);

// Product
router.get("/product/:id", productC.getDetailProductById);
router.get("/popular-product", productC.getProductPopular);

// Cart
router.post("/cart/list", cartC.getCartProduct);
router.post("/cart/:id", cartC.addToCart);
router.delete("/cart/:id", cartC.deleteProductCart);
router.delete("/delete-all/cart", cartC.deleteAllProductCart);

// Order
router.post("/order", orderC.sendOrder);
router.post("/order/list", orderC.getOrder);

module.exports = router;
