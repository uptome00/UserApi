const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "P@ssw0rd",
  database: "db1",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
