
/**
 * Function to set up graceful shutdown. Defines shutdown function and when it's called.
 * @param {Object} server Express router listening to port
 * @param {Object} pool   Pool of sql connections
 */
const setupGracefulShutdown = (server, pool) => {
  /**
   * Function to be called on shutdown. Closes SQL connection and express server, and prints result.
   */
  function shutdown() {

    console.info("\n💀 Shutting down gracefully");

    // Closing the SQL connection, and printing result
    pool.end((err) => {
      if (err) {
        console.error("💀⚠️ Error closing MySQL connection:", err.stack);
      } else {
        console.info("💀 MySQL connection closed");
      }

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
    });
  };

  // Set shutdown function to be called on shutdown
  process.on("SIGTERM", shutdown); // If terminated by another application
  process.on("SIGINT", shutdown);  // If ctrl-c
};

module.exports = setupGracefulShutdown;
