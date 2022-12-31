var express = require("express");
var adminRouter = require("./users");
var router = express.Router();

/* GET home page. */
router.get("/admin", adminRouter);

module.exports = router;
