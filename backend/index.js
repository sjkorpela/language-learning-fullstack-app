
/**
 * Main function of the index.js file. Is ran when the backend is started.
 *
 * Handles starting everything else and sets up graceful shutdown.
 */
async function main() {
  // Module dependencies
  const express = require("express"); // express for routing
  const path = require("path");       // path for setting express dist path
  require('dotenv').config()          // dotenv for accessing environment variables

  // Self-made dependencies
  const router = require("./router.js"); // Router of all http requests
  const setUpGracefulShutdown = require("./shutdown.js"); // Graceful shutdown setup function


  // Create express application with cors
  const app = express();

  // Apply middleware to router
  // app.use(cors());         // CORS
  app.use(express.json()); // json parsing
  app.use(router);         // URL routing

  // Read port from .env
  const port = process.env.PORT || 5678;

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));

  // Handle other routes by serving the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // Start server on port
  const server = app.listen(port, () => {
    console.log(`🚀 LLFSA backend API listening on port ${port}`);
  });

  // Set router dist path
  app.use(express.static(path.join(__dirname, "dist")));

  // Call graceful shutdown setup with server and sql instance
  setUpGracefulShutdown(server);
}

console.info(
  "Console emoji meanings:\n"
  + "🚀 is for backend startup\n"
  + "☎️ is for API router logs\n"
  + "🤠 is for SQL handler logs\n"
  + "🌊 is for SQLite logs\n"
  + "💀 is for shutdown logs\n"
  + "\nThis is for quicker readability when testing\n"
  );

// Run main function to start everything
main();
