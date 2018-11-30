/* eslint no-unused-vars: "off" */
// knex migrate:latest --env development || knex migrate:rollback

exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary(); // unique ID
    // Basic information
    table
      .text("username")
      .notNull()
      .unique();
    table.binary("password").notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};

exports.config = { transaction: false };
