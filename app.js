/* app.js - express server */
// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const history = require("connect-history-api-fallback");
const logger = require("morgan");
const bodyParser = require("body-parser");
// const favicon = require('serve-favicon')
require("dotenv").config({ path: "./environment/standard.env" });

// include passport ?
/*
const passport = require("passport");
require("./auth/passport")(passport);
*/

// check connection from database
/*
const testDb = require("./database/testDb");
testDb.checkConnection().then(response => {
  console.log("Database connected @ " + response[0].now);
});
*/

// Routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

// express framework
const app = express();

// Dev Log
app.use(logger("dev"));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static routes - history() requires to assign it again
app.use(express.static(path.join(__dirname, "dist")));
app.use(history());
app.use(express.static(path.join(__dirname, "dist")));

// ROUTES ------------

// Get API route, so we can quickly change it in the environment
const apiRoute = process.env.API_ROUTE; // is -> "/api"

// basic routes
app.use(apiRoute + "/", indexRouter); // -> localhost:port/api/

// Routes for user and password
app.use(apiRoute + "/user", userRouter); // -> localhost:port/api/user

// ROUTES END ------------

// catch 404 and forward to error handler
app.use(function(req, res /*, next*/) {
  res.status(404).send("Not Found");
  // next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
