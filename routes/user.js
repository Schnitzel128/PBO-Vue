const express = require("express");
const router = express.Router();

// const jwt = require("jsonwebtoken");

/* get ?? */
router.get("/", function(req, res) {
  res.send("Hello World");
});

/* post ?? */
router.post("/", function(req, res) {
  if (typeof req.body.username !== "undefined") {
    res.send("Hello " + req.body.username);
  } else {
    res.status(400).send("There is no username!");
  }
});

module.exports = router;
