// All routes under "/api/"
const express = require("express");
const router = express.Router();
const userDB = require("../database/userDb");

const jwt = require("jsonwebtoken");
// import our helper
const hash = require("../auth/hash");

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
router.post("/login", async function(req, res, next) {
  if (
    typeof req.body.username !== "undefined" &&
    typeof req.body.password !== "undefined"
  ) {
    try {
      // get user by username
      const user = await userDB.getUserByUsername(req.body.username);
      if (user.length === 1) {
        // check if we got exactly one row/user (more shouldn't be possible due to UNIQUE)
        // !!!!!! DO NOT SAVE PLAIN PASSWORD !!!!!!!
        // insert HASH comparison here!
        const validation = await hash.compareHash(
          req.body.password,
          user[0].password
        );
        if (validation.newHash) {
          // update password
          await userDB.updatePasswordById(
            user.rows[0].user_id,
            req.body.password
          );
        }
        // Password match, create JWT and send it to the user
        const token = jwt.sign(
          { id: user[0].id, username: user[0].username },
          process.env.SECRET
        );
        res.send({ username: user[0].username, token: "JWT " + token });
      } else {
        res.status(400).send("No user found with that username");
      }
    } catch (e) {
      // something went wrong
      next(e);
    }
  } else {
    res.status(400).send('Please provide "username" and "password".');
  }
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
