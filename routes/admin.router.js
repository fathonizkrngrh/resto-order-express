var express = require("express");
var router = express.Router();
const productController = require("../controllers/admin/product.controller");

/* GET users listing. */
router.get("/product", productController.viewProduct);

module.exports = router;
