var express = require("express");
var router = express.Router();
const apiController = require("../controllers/api/api.controller");

/* category */
router.get("/category", apiController.getProductByCategory);

// Product
router.get("/product/:id", apiController.getDetailProductById);
router.get("/popular-product", apiController.getProductPopular);

// Order
router.post("/order", apiController.sendOrder);

module.exports = router;
