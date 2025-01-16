
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

      // Build the SQL query, cannot escape table
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

      // Build the SQL query, somehow ? don't work here
      query = `SELECT * FROM ${table} WHERE id = ?`;

      // Send the query, and reject/resolve
      database.all(query, [id], function (error, data) {
        if (error) {
          console.log(`🤠 GET ROW failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          console.log(`🤠 GET ROW succeeded, resolving`);
          resolve(data);
        }
      })
    })
  },

  DeleteRow(table, id) {
    return new Promise(async (resolve, reject) => {
      console.log(`🤠 DELETE ROW start, table:${table}, id:${id}`);

      // Validate params
      try {

        await schema.validateAsync({
          "id": id
        })

      } catch (error) {
        console.log(`🤠 DELETE ROW failed, rejecting, error:\n`, error);
        reject(error);
      }

      // Build the SQL query
      const query = `DELETE FROM ${table} WHERE id = ?`;

      // Send the query, and reject/resolve
      database.run(
        query,
        [id],
        function (error, data) {
        if (error) {
          console.log(`🤠 DELETE ROW failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          console.log(`🤠 DELETE ROW succeeded, resolving`);
          resolve(data);
        }
      })
    })
  },

  PostWord(params) {
    return new Promise(async (resolve, reject) => {
      console.log(`🤠 POST WORD start`);

      // Validate params
      try {

        await schema.validateAsync({
          "word": params.fooWord,
          "lang": params.fooLang
        })

        await schema.validateAsync({
          "word": params.barWord,
          "lang": params.barLang
        })

        await schema.validateAsync({
          "tags": params.tags
        })

      } catch (error) {
        console.log(`🤠 POST WORD failed, rejecting, error:\n`, error);
        reject(error);
      }

      // Build the SQL query
      const query = (
        "INSERT INTO words(fooWord, fooLang, barWord, barLang, tags) VALUES"
        + "(?, ?, ?, ?, ?)"
      )

      // Send the query, and reject/resolve
      database.all(
        query,
        [params.fooWord, params.fooLang, params.barWord, params.barLang, params.tags],
        function (error, data) {
        if (error) {
          console.log(`🤠 POST WORD failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          console.log(`🤠 POST WORD succeeded, resolving`);
          resolve(data);
        }
      })
    })
  },

  PutWord(params) {
    return new Promise(async (resolve, reject) => {
      console.log(`🤠 PUT WORD start`);

      // Validate params
      try {

        await schema.validateAsync({
          "word": params.fooWord,
          "lang": params.fooLang
        })

        await schema.validateAsync({
          "word": params.barWord,
          "lang": params.barLang
        })

        await schema.validateAsync({
          "id": params.id,
          "tags": params.tags
        })

      } catch (error) {
        console.log(`🤠 PUT WORD failed, rejecting, error:\n`, error);
        reject(error);
      }

      // Build the SQL query
      const query = (
        "UPDATE words SET "
        + "fooWord = ?, "
        + "fooLang = ?, "
        + "barWord = ?, "
        + "barLang = ?, "
        + "tags = ? "
        + "WHERE id = ?"
      )

      // Send the query, and reject/resolve
      database.all(
        query,
        [params.fooWord, params.fooLang, params.barWord, params.barLang, params.tags, params.id],
        function (error, data) {
        if (error) {
          console.log(`🤠 PUT WORD failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          console.log(`🤠 PUT WORD succeeded, resolving`);
          resolve(data);
        }
      })
    })
  },

  // PatchWord(params) { },

  PostTag(params) {
    return new Promise(async (resolve, reject) => {
      console.log(`🤠 POST TAG start`);

      // Validate params
      try {

        await schema.validateAsync({
          "tag": params.name
        })

      } catch (error) {
        console.log(`🤠 POST TAG failed, rejecting, error:\n`, error);
        reject(error);
      }

      // Build the SQL query
      const query = (
        "INSERT INTO tags(name) VALUES (?)"
      )

      // Send the query, and reject/resolve
      database.run(
        query,
        [params.name],
        function (error, data) {
        if (error) {
          console.log(`🤠 POST TAG failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          console.log(`🤠 POST TAG succeeded, resolving`);
          resolve(data);
        }
      })
    })
  },

  PutTag(params) { }
  // PatchTag(params) { },

}

module.exports = handlerFunctions;
