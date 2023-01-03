var express = require("express");
var router = express.Router();
const productController = require("../controllers/admin/product.controller");
const categoryController = require("../controllers/admin/category.controller");
const { uploadMultiple } = require("../middleware/multer");

/* Product */
router.get("/product", productController.viewProduct);
router.post("/product", uploadMultiple, productController.addProduct);
router.put("/product/:id", uploadMultiple, productController.addProduct);
router.delete("/product/:id", productController.addProduct);

// Category
router.get("/category", categoryController.viewCategory);
router.post("/category", categoryController.addCategory);
router.get("/category/:id", categoryController.viewCategoryById);
router.put("/category", categoryController.editCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
