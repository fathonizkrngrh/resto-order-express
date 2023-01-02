var express = require("express");
var router = express.Router();
const productController = require("../controllers/admin/product.controller");
const categoryController = require("../controllers/admin/category.controller");

/* Product */
router.get("/product", productController.viewProduct);

// Category
router.get("/category", categoryController.viewCategory);
router.post("/category", categoryController.addCategory);

module.exports = router;
