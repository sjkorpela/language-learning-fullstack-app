
// Self-made dependencies
const pool = require("./pool.js");
const schema = require("./validation.js");

const handlerFunctions = {

  /**
   * Gets all ids from given table. Called when an http get request is received with no given id.
   * @param {String} table Name of the table data is to be gotten from. ex. "tests", "submissions"
   */
  GetAll(table) {
    return new Promise((resolve, reject) => {
      console.log(`🤠 GET ALL start, table:${table}`);
      resolve("moi");
      console.log(`🤠 GET ALL end, table:${table}`);
    })
  },

  /**
   * Gets given id from given table. Called when an http get request is received with a given id.
   * @param {String} table Name of the table data is to be gotten from. ex. "tests", "submissions"
   */
  GetId(table, id) {
    return new Promise((resolve, reject) => {
      console.log(`🤠 GET ID start, table:${table} id:${id}`);
      resolve("moi");
      console.log(`🤠 GET ID end, table:${table} id:${id}`);
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
}

module.exports = handlerFunctions;