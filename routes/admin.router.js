var express = require("express");
var router = express.Router();
const productController = require("../controllers/admin/product.controller");
const categoryController = require("../controllers/admin/category.controller");

/* Product */
router.get("/product", productController.viewProduct);

// Category
router.get("/category", categoryController.viewCategory);
router.post("/category", categoryController.addCategory);
router.get("/category/:id", categoryController.viewCategoryById);
router.put("/category/edit", categoryController.editCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
