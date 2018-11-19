const config = require("./dbConfig");
const knex = require("knex")(config);

exports.getUsers = function() {
  return knex("users").select("id", "username");
};

exports.getUserById = function(id) {
  return knex("users").where("id", parseInt(id) || 0);
};

exports.getUserByUsername = function(username) {
  return knex("users").where("username", username);
};

exports.insertUser = function(username, password) {
  // hash password ?
  return knex("users")
    .returning(["id", "username"])
    .insert({
      username: username,
      password: password //unsafe! Never save a blank password in the database
    });
};

exports.updatePasswordById = function(id, password) {
  // hash new password
  return knex("users")
    .where("id", parseInt(id) || 0)
    .update({ password: password });
};

exports.deleteUserById = function(id) {
  return knex("users")
    .where("id", parseInt(id) || 0)
    .del();
};
