// All routes under "/api/users"
const express = require("express");
const router = express.Router();
const userDB = require("../database/userDb");

// const jwt = require("jsonwebtoken");

// we want to protect this route
router.get("/", async function(req, res) {
  try {
    if (typeof req.query.id !== "undefined") {
      const userById = await userDB.getUserById(req.query.id); // "/api/users?id=xxx"
      res.send(userById);
    } else {
      const users = await userDB.getUsers();
      res.send(users);
    }
  } catch (e) {
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
