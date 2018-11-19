const knexfile = require("../knexfile");

module.exports = {
  client: "pg",
  connection: {
    host: "localhost",
    database: knexfile.development.connection.database,
    user: knexfile.development.connection.user,
    password: knexfile.development.connection.password
  }
};
