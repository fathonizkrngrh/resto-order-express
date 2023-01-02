var express = require("express");
var adminRouter = require("./admin.router");
var router = express.Router();

/* GET home page. */
router.use("/admin", adminRouter);

module.exports = router;
