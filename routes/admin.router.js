var express = require("express");
var router = express.Router();
const productController = require("../controllers/admin/product.controller");
const categoryController = require("../controllers/admin/category.controller");
const { uploadMultiple, upload } = require("../middleware/multer");

/* Product */
router.get("/product", productController.viewProduct);
router.get("/product/show-image/:id", productController.showImageProduct);
router.post("/product", uploadMultiple, productController.addProduct);
router.put("/product/:id", productController.addProduct);
router.delete("/product/:id", productController.addProduct);

// Category
router.get("/category", categoryController.viewCategory);
router.post("/category", categoryController.addCategory);
router.get("/category/:id", categoryController.viewCategoryById);
router.put("/category", categoryController.editCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
