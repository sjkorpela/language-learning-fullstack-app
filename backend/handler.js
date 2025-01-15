
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
  DeleteWord(id) { },

  PostTag(params) { },
  PutTag(params) { },
  // PatchTag(params) { },
  DeleteTag(id) { }

}
