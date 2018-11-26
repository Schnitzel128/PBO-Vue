const config = require("./dbConfig");
const knex = require("knex")(config);

exports.checkConnection = function() {
  return knex("users").select(knex.raw("NOW()"));
};
