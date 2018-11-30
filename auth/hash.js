const Promise = require("bluebird");
const securePassword = require("secure-password");
const createError = require("http-errors");

// Initialise our password policy
var pwd = securePassword();

/* Compare hash helper function */
exports.compareHash = function(candidatePassword, hash) {
  return new Promise(async (resolve, reject) => {
    const userPasswordBuffer = Buffer.from(candidatePassword);
    const hashBuffer = Buffer.from(hash);
    const result = await pwd.verify(userPasswordBuffer, hashBuffer);

    switch (result) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
        // Hash is not valid or it was not made with secure-password
        reject(createError(500, "Hash is invalid"));
        break;
      case securePassword.INVALID:
        // Invalid password
        reject(createError(401, "Invalid password"));
        break;
      case securePassword.VALID:
        // Authenticated
        resolve({ message: "Authenticated" });
        break;
      case securePassword.VALID_NEEDS_REHASH:
        // Yay you made it, wait for us to improve your safety
        // try const improvedHash = await pwd.hash(userPasswordBuffer)
        resolve({
          newHash: true,
          message: "Authenticated"
        });
        break;
      default:
        reject(createError(500, "Something went wrong"));
    }
  });
};

/* generate hash helper function */
exports.generateHash = function(password) {
  return new Promise(async (resolve, reject) => {
    try {
      const userPassword = Buffer.from(password);
      // create hash
      const hash = await pwd.hash(userPassword);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};
