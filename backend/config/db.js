const mysql = require("mysql2/promise"); // Use promise-based version for async/await
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

console.log("Attempting to connect with the following credentials:");
console.log("Host:", process.env.MYSQL_HOST || "localhost");
console.log("User:", process.env.MYSQL_USER || "root");
console.log("Database:", process.env.MYSQL_DATABASE || "employee");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",        // Database host
  user: process.env.MYSQL_USER || "root",            // Database username
  password: process.env.MYSQL_PASSWORD || "",        // Database password
  database: process.env.MYSQL_DATABASE || "employee", // Default database
  waitForConnections: true,                          // Wait for free connection
  connectionLimit: 10,                               // Maximum connections
  queueLimit: 0                                      // Unlimited queue size
});

// Test the database connection
pool.getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release(); // Release the connection back to the pool
  })
  .catch((error) => {
    console.error("Database connection failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Full error object:", error);
  });

module.exports = { pool };
