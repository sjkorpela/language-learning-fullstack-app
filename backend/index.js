
/**
 * Main function of the index.js file. Is ran when the backend is started.
 *
 * Handles starting everything else and sets up graceful shutdown.
 */
async function main() {
  // Module dependencies
  const express = require("express"); // express for routing
  const cors = require("cors");       // cors for managing CORS
  const path = require("path");       // path for setting express dist path
  require('dotenv').config()          // dotenv for accessing environment variables

  // Self-made dependencies
  const router = require("./router.js"); // Router of all http requests
  const pool = require("./pool.js");     // SQL connection pool for graceful shutdown
  const setUpGracefulShutdown = require("./shutdown.js"); // Graceful shutdown setup function



  // Create express application with cors
  const app = express();

  // Apply middleware to router
  app.use(cors());         // CORS
  app.use(express.json()); // json parsing
  app.use(router);         // URL routing

  // Read port from .env
  const port = process.env.DB_PORT;

  // Start server on port
  const server = app.listen(port, () => {
    console.log(`🚀 LLFSA backend API listening on port ${port}`);
  });

  // Set router dist path
  app.use(express.static(path.join(__dirname, "dist")));

  // Call graceful shutdown setup with server instance
  setUpGracefulShutdown(server, pool);
}

console.info(
  "Console emoji meanings:\n"
  + "🚀 is for backend startup\n"
  + "☎️ is for router logs\n"
  + "🤠 is for handler logs\n"
  + "🌊 is for pool logs\n"
  + "💀 is for shutdown logs\n"
  + "\nThis is for quicker readability when testing"
  );

// Run main function to start everything
main();
