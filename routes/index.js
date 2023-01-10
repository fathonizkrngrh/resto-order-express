var express = require("express");
var adminRouter = require("./admin.router");
var apiRouter = require("./api.router");
var router = express.Router();

/* GET home page. */
router.use("/admin", adminRouter);
router.use("/api", apiRouter);

module.exports = router;
