
/**
 * Function to set up graceful shutdown. Defines shutdown function and when it's called.
 * @param {Object} server Express router listening to port
 */
const setupGracefulShutdown = (server) => {
  /**
   * Function to be called on shutdown. Closes SQL connection and express server, and prints result.
   */
  function shutdown() {

    console.info("\n💀 Shutting down gracefully");

    // Closing the server, and printing result
    server.close((err) => {
      if (err) {
        console.error("💀⚠️ Error closing express server:", err.stack);
      } else {
        console.info("💀 Express server closed");
      }

      // Exiting process
      process.exit(0);
    });
  };

  // Set shutdown function to be called on shutdown
  process.on("SIGTERM", shutdown); // If terminated by another application
  process.on("SIGINT", shutdown);  // If ctrl-c
};

module.exports = setupGracefulShutdown;
