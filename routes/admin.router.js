var express = require("express");
var router = express.Router();
const productController = require("../controllers/admin/product.controller");
const categoryController = require("../controllers/admin/category.controller");
const orderController = require("../controllers/admin/order.controller");
const { uploadMultiple, upload } = require("../middleware/multer");

/* Product */
router.get("/product", productController.viewProduct);
router.get("/product/show-image/:id", productController.showImageProduct);
router.get("/product/:id", productController.showEditProduct);
router.post("/product", uploadMultiple, productController.addProduct);
router.put("/product/:id", uploadMultiple, productController.editProduct);
router.put("/product/:id/status", productController.changeStatus);
router.delete("/product/:id/delete", productController.deleteProduct);

// Category
router.get("/category", categoryController.viewCategory);
router.post("/category", categoryController.addCategory);
router.get("/category/:id", categoryController.viewCategoryById);
router.put("/category", categoryController.editCategory);
router.delete("/category/:id", categoryController.deleteCategory);

// Order
router.get("/order", orderController.viewOrder);

module.exports = router;
