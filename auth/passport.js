const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const userDB = require("../database/userDb");

module.exports = function(passport) {
  // options for JWT
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.SECRET;

  // let passport use the JWT strategy with our options
  passport.use(
    new JwtStrategy(opts, async function(jwtPayload, done) {
      try {
        if (
          typeof jwtPayload.id === "undefined" ||
          isNaN(parseInt(jwtPayload.id))
        ) {
          // can't find id or it's not an integer
          done(null, false);
        } else {
          // find user in database
          const user = await userDB.getUserById(jwtPayload.id);
          if (user.length === 1) {
            // check if we got exactly one row/user (more shouldn't be possible due to UNIQUE)
            done(null, user[0]);
          } else {
            // we didn't found a user in our database or we received more than one row/user
            done(null, false);
          }
        }
      } catch (e) {
        // anything bad happened, not authenticated!!
        return done(e, false);
      }
    })
  );
};
