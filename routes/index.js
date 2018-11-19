// All routes under "/api/"
const express = require("express");
const router = express.Router();
// const userDB = require("../database/userDb");

/* easy get example */
router.get("/", function(req, res) {
  res.send("Hello World");
});

/* post example */
router.post("/", function(req, res) {
  if (typeof req.body.username !== "undefined") {
    res.send("Hello " + req.body.username);
  } else {
    res.status(400).send("There is no username!");
  }
});

/* Login Route */
router.post("/login", function(req, res) {
  // look if username/password is provided
  // if yes, look in database for user
  // compare passwords
  // if password right -> generate JWT and send it to the user (and maybe username)
  res.send("login");
});

router.post("/register", function(req, res) {
  // look if user provided username, password and password2 (comparison check)
  // if yes, create user and send a little response back
  res.send("Register");
});

module.exports = router;
