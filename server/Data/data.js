require("dotenv").config();

let db = {
  database: process.env.DATABASE,
  server: process.env.SERVER,
  driver: "msnodesqlv8",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedConnection: true,
  },
};

module.exports = db;
