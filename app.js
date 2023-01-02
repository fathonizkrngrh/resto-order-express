require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
// const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse, apiNotFoundResponse } = require("./utils/api.response");
const routes = require("./routes/index");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/resto-order", {
  useNewUrlParser: true,
});

const app = express();
const port = process.env.PORT || 8080;

// var corsOptions = {
//   origin: "http://localhost:8081",
// };
// app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(
    path.join(__dirname, "./node_modules/startbootstrap-sb-admin-2")
  )
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { masAge: 6000 },
  })
);
app.use(flash());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/", routes);

app.get("/", (req, res) =>
  res
    .status(status.OK)
    .json(apiResponse(status.OK, "OK", "Welcome to Angkasa API Application."))
);

// catch 404 and forward to error handler
app.use((req, res) =>
  res
    .status(status.NOT_FOUND)
    .json(apiNotFoundResponse("The requested resource could not be found"))
);

// error handler
app.use((err, req, res, next) =>
  res
    .status(status.INTERNAL_SERVER_ERROR)
    .json(
      apiResponse(
        status.INTERNAL_SERVER_ERROR,
        "INTERNAL_SERVER_ERROR",
        err.message
      )
    )
);

app.listen(port, () => {
  console.info(`======= Server is running on http://localhost:${port} =======`);
});

module.exports = app;