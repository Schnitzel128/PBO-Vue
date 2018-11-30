const config = require("./dbConfig");
const knex = require("knex")(config);
const hashHelper = require("../auth/hash");

exports.getUsers = function() {
  return knex("users").select("id", "username");
};

exports.getUserById = function(id) {
  return knex("users").where("id", parseInt(id) || 0);
};

exports.getUserByUsername = function(username) {
  return knex("users").where("username", username);
};

exports.insertUser = async function(username, password) {
  // hash password ?
  const hash = await hashHelper.generateHash(password);
  return knex("users")
    .returning(["id", "username"])
    .insert({
      username: username,
      password: hash // only save the hash in the database!!
    });
};

exports.updatePasswordById = async function(id, password) {
  // hash new password
  const passwordHash = await hashHelper.generateHash(password);
  return knex("users")
    .where("id", parseInt(id) || 0)
    .update({ password: passwordHash });
};

exports.deleteUserById = function(id) {
  return knex("users")
    .where("id", parseInt(id) || 0)
    .del();
};
