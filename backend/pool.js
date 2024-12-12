
// Module dependancies
const mysql = require("mysql");

// Create pool with connection limit and environment variables
const pool = mysql.createPool({
  connectionLimit: 3,                 // Amount of connections allowed at once
  host: process.env.DB_HOST,          // Server to contact for queries
  user: process.env.DB_USER,          // Username credential
  password: process.env.DB_PASSWORD,  // Password credential
  database: process.env.DB_DATABASE,  // Database that is queried
  multipleStatements: false,          // Disallow multiple statements per query
});

// Add console prints for pool actions: when waiting for a slot, when acquiring a slot, and for when releasing a slot
pool.on("enqueue", function () { console.log("🌊 Waiting for available connection slot"); });
pool.on("acquire", function (connection) { console.log(`🌊 Connection ${connection.threadId} acquired`); });
pool.on("release", function (connection) { console.log(`🌊 Connection ${connection.threadId} released`); });

module.exports = pool;
