
// Self-made dependencies
const pool = require("./pool.js");
const schema = require("./validation.js");

const handlerFunctions = {

  /**
   * !!!!!!Gets all ids from given table. Called when an http get request is received with no given id.
   * @param {String} table Name of the table data is to be gotten from. ex. "tests", "submissions"
   */
  GetAllTests() {
    return new Promise((resolve, reject) => {
      console.log(`🤠 GET ALL TESTS start`);

      // Build the SQL query
      query = "SELECT * FROM tests";

      // Query the query, and reject/resolve
      pool.query(query, function (error, data) {
        if (error) {
          console.log(`🤠 GET ALL TESTS failed, rejecting\n`, error);
          reject(error);
        } else {
          console.log(`🤠 GET ALL TESTS succeeded, resolving`);
          resolve(data);
        }
      });

      console.log(`🤠 GET ALL TESTS end`);
    })
  },

  /**
   * !!!!Gets given id from given table. Called when an http get request is received with a given id.
   * @param {String} table Name of the table data is to be gotten from. ex. "tests", "submissions"
   */
  GetTest(id) {
    return new Promise((resolve, reject) => {
      console.log(`🤠 GET TEST ${id} start`);

      // Build the SQL query
      query = "SELECT * FROM tests WHERE id = ?";

      // Query the query, and reject/resolve
      pool.query(query, [id], function (error, data) {
        if (error) {
          console.log(`🤠 GET TEST ${id}, rejecting\n`, error);
          reject(error);
        } else {
          console.log(`🤠 GET TEST ${id} succeeded, resolving`);
          resolve(data);
        }
      });

      console.log(`🤠 GET TEST ${id}}`);
    })
  },

  /**
   * Gets all submissions for given test id.
   * @param {Number} testId
   */
  GetTestSubmissions(id) {
    return new Promise((resolve, reject) => {
      console.log(`🤠 GET TEST SUBMISSIONS start, id:${id}`);

      resolve("moi");

      console.log(`🤠 GET TEST SUBMISSIONS end, id:${id}`);
    })
  },

  PostTest({ testName }) {
    console.log(`🤠 POST TEST start`);



    console.log(`🤠 POST TEST end`);
  },
}

module.exports = handlerFunctions;