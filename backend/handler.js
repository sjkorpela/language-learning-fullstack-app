
// Self-made dependencies
const database = require("./database.js");
const schema = require("./validation.js");

const handlerFunctions = {

  GetAll(table) {
    return new Promise(async (resolve, reject) => {
      console.log(`🤠 GET ALL start, table:${table}`);

      // Validate table name
      try {
        await schema.validateAsync({ "table": table })
      } catch (error) {
        console.log(`🤠 GET ALL failed, rejecting\n`, error);
          reject(error);
      }

      // Build the SQL query
      const query = `SELECT * FROM ${table}`;

      // Send the query, and reject/resolve
      database.all(query, [], function (error, data) {
        if (error) {
          console.log(`🤠 GET ALL failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          console.log(`🤠 GET ALL succeeded, resolving`);
          resolve(data);
        }
      })

      console.log(`🤠 GET ALL end`);
    })
  },
  GetRow(table, id) {
    return new Promise(async (resolve, reject) => {
      console.log(`🤠 GET ROW start, table:${table}`);

      // Validate params
      try {
        await schema.validateAsync({
          "table": table,
          "id": id
        })
      } catch (error) {
        console.log(`🤠 GET ROW failed, rejecting, error:\n`, error);
        reject(error);
      }

      // Build the SQL query
      query = `SELECT * FROM ${table} WHERE id = ${id}`;

      // Send the query, and reject/resolve
      database.all(query, [], function (error, data) {
        if (error) {
          console.log(`🤠 GET ROW failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          console.log(`🤠 GET ROW succeeded, resolving`);
          resolve(data);
        }
      })

      console.log(`🤠 GET ROW end`);
    })
  },

  PostWord(params) { },
  PutWord(params) { },
  PatchWord(params) { },
  DeleteWord(id) { },

  PostTag(params) { },
  PutTag(params) { },
  PatchTag(params) { },
  DeleteTag(id) { }

}

const old = {
  /**
   * Gets all ids from given table. Called when an http get request is received with no given id.
   * @param {String} table Name of the table data is to be gotten from. ex. "tests", "submissions"
   */
  GetAllTests() {
    return new Promise((resolve, reject) => {
      console.log(`🤠 GET ALL TESTS start`);

      // Build the SQL query
      query = "SELECT * FROM tests";

      // Query the query, and reject/resolve
      // pool.query(query, function (error, data) {
      //   if (error) {
      //     console.log(`🤠 GET ALL TESTS failed, rejecting\n`, error);
      //     reject(error);
      //   } else {
      //     console.log(`🤠 GET ALL TESTS succeeded, resolving`);
      //     resolve(data);
      //   }
      // });

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
      // pool.query(query, [id], function (error, data) {
      //   if (error) {
      //     console.log(`🤠 GET TEST ${id}, rejecting\n`, error);
      //     reject(error);
      //   } else {
      //     console.log(`🤠 GET TEST ${id} succeeded, resolving`);
      //     resolve(data);
      //   }
      // });

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



  GetAllWords() {
    return new Promise((resolve, reject) => {
      console.log(`🤠 GET ALL WORDS start`);

      // Build the SQL query
      query = "SELECT * FROM words";

      // Query the query, and reject/resolve
      // pool.query(query, function (error, data) {
      //   if (error) {
      //     console.log(`🤠 GET ALL WORDS failed, rejecting\n`, error);
      //     reject(error);
      //   } else {
      //     console.log(`🤠 GET ALL WORDS succeeded, resolving`);
      //     resolve(data);
      //   }
      // });

      console.log(`🤠 GET ALL WORDS end`);
    })
  },

  PostWord({ word1, word2 }) {
    return new Promise((resolve, reject) => {


      console.log(`🤠 POST WORD start`);

      query = "INSERT INTO words(word1, word2) VALUES (?, ?)";

      // Query the query, and reject/resolve
      // pool.query(query, [word1, word2], function (error, data) {
      //   if (error) {
      //     console.log(`🤠 POST WORD failed, rejecting\n`, error);
      //     reject(error);
      //   } else {
      //     console.log(`🤠 POST WORD succeeded, resolving`);
      //     resolve(data);
      //   }
      // });

      console.log(`🤠 POST WORD end`);
    })
  },
}

module.exports = handlerFunctions;