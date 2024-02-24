const { createPool } = require("mysql2/promise");
require("dotenv").config();

const pool = createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port_DB,
  database: process.env.database,
});

module.exports = { pool };
