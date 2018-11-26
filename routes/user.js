// All routes under "/api/users"
const express = require("express");
const router = express.Router();
const userDB = require("../database/userDb");

const passport = require("passport");
require("../auth/passport")(passport);

// we want to protect this route
router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  async function(req, res) {
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
  }
);

router.delete("/:username", async function(req, res, next) {
  try {
    const user = await userDB.getUserByUsername(req.params.username);
    if (user.length === 1) {
      const deleted = await userDB.deleteUserById(user[0].id);
      res.send("Deleted " + deleted + " rows.");
    } else {
      res.status(400).send("No user found with that username");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
