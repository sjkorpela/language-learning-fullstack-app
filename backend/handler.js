
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
        return;
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
        return;
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
        await schema.validateAsync({ "id": id })
      } catch (error) {
        console.log(`🤠 DELETE ROW failed, rejecting, error:\n`, error);
        reject(error);
        return;
      }

      // Build the SQL query
      const query = `DELETE FROM ${table} WHERE id = ?`;

      // Send the query, and reject/resolve, also if deleted tag, remove tag from word tags
      database.run(
        query,
        [id],
        async function (error, data) {
        if (error) {
          console.log(`🤠 DELETE ROW failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          if (table == "tags") {
            console.log(`🤠 DELETE ROW succeeded, updating words`);
            try {
              await handlerFunctions.RebuildWordTags(id);
              console.log(`🤠 UPDATE WORDS succeeded, resolving`);
              resolve(data);
            } catch (e) {
              console.log(`🤠 UPDATE WORDS failed, rejecting, error:\n`, error);
              reject(error);
            }
          } else {
            console.log(`🤠 DELETE ROW succeeded, resolving`);
            resolve(data);
          }

        }
      })
    })
  },

  /**
   * Updates all database word tag strings, so that a reused tag id doesn't mess anything up.
   *
   * I am not sure if SQLite does this, but at least MySQL reuses an id with auto increment, if you delete the most recent one.
   * Also this is good practice, probably.
   *
   * @param {Number} id Id of the tag that was deleted
   */
  async RebuildWordTags(id) {
    return new Promise(async (resolve) => {

      // Get all words
      const words = await handlerFunctions.GetAll("words");

      // Find words with the tag, and patch new tag strings in
      for (let word of words) {

        // Regex to find digits of any length
        const regex = new RegExp(/(\d+)/g);

        // Get all ids from tag string, "1,2,3" -> [1, 2, 3]
        const matches = [...word.tags.matchAll(regex)];

        // Check for tag id
        const tagged = (
          matches.find((it) => { return id == it; }) >= 0
        )

        // If tagged, rebuild tag string, and patch
        if (tagged) {

          // Empty string to build new tag string in
          const newTags = "";

          // Build string
          for (let i = 0; i < matches.length; i++) {
            if (matches[i] != id) {
              newTags += (i == matches.length - 1) ? matches[i] : matches[i] + ",";
            }
          }

          // Build params for patch request
          params = {
            id: word.id,
            tags: newTags
          }

          await PatchWord(params);
        }
      }

      // Resolve
      resolve();
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
        return;
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
          "tags": params.tags,
          "id": params.id
        })

      } catch (error) {
        console.log(`🤠 PUT WORD failed, rejecting, error:\n`, error);
        reject(error);
        return;
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

  PatchWord(params) {
    return new Promise(async (resolve, reject) => {
      console.log(`🤠 PATCH WORD start, params:\n`, params);

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
        console.log(`🤠 PATCH WORD failed, rejecting, error:\n`, error);
        reject(error);
        return;
      }


      let query = "UPDATE words SET ";
      const escapes = [];
      const keys = Object.keys(params);

      for (let i = 0; i < keys.length; i++) {
        if (params[keys[i]] != undefined && keys[i] != "id") {

          // If not first added, add ", " before
          query += (escapes.length > 0) ? ", " : "";

          // Add to query
          query += `${keys[i]} = ?`

          // Add to escaped params
          escapes.push(params[keys[i]]);
        }
      }

      query += " WHERE id = ?";
      escapes.push(params.id);

      console.log("🌊 Querying (run) with query and params:\n", query + "\n", escapes);

      // Send the query, and reject/resolve
      database.run(
        query,
        escapes,
        function (error, data) {
          if (error) {
            console.log(data);
          console.log(`🤠 PATCH WORD failed, rejecting, error:\n`, error);
          reject(error);
        } else {
          console.log(`🤠 PATCH WORD succeeded, resolving`);
          resolve(data);
        }
      })
    })
  },

  PostTag(params) {
    return new Promise(async (resolve, reject) => {
      console.log(`🤠 POST TAG start`);

      // Validate params
      try {
        await schema.validateAsync({ "tag": params.name})
      } catch (error) {
        console.log(`🤠 POST TAG failed, rejecting, error:\n`, error);
        reject(error);
        return;
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
