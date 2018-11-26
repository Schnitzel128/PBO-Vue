// All routes under "/api/"
const express = require("express");
const router = express.Router();
const userDB = require("../database/userDb");

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

router.post("/register", async function(req, res, next) {
  // look if user provided username, password and password2 (comparison check)
  if (
    typeof req.body.username !== "undefined" &&
    typeof req.body.password !== "undefined" &&
    typeof req.body.password2 !== "undefined"
  ) {
    if (req.body.password === req.body.password2) {
      // try the following, because it can fail if the database operation fails
      try {
        // check if user already exists
        const usersByUsername = await userDB.getUserByUsername(
          req.body.username
        );
        if (usersByUsername.length === 0) {
          // create user
          const insertedUser = await userDB.insertUser(
            req.body.username,
            req.body.password
          );
          // success
          res.send(
            'User "' + insertedUser[0].username + '" saved successfully'
          );
        } else {
          res.status(400).send("Username already exists");
        }
      } catch (e) {
        // something went wrong
        next(e);
      }
    } else {
      res.status(400).send("Passwords does not match");
    }
  } else {
    res
      .status(400)
      .send('Please provide "username", "password" and "password2".');
  }
});

module.exports = router;
