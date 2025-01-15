
// Import SQLite
const sqlite3 = require("sqlite3").verbose();

// Initalize SQLite database in memory
const database = new sqlite3.Database(":memory:", (error) => {
  if (error) {
    console.error("🌊⚠️ Error connecting to in-memory SQLite database", error);
  } else {
    console.log("🌊 Connected to in-memory SQLite database");

    // Initialize the database schema, and insert example data
    // Queries are multiline for readability
    database.serialize(() => {

      // Create words table
      database.run(
        "CREATE TABLE words("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
        + "fooWord VARCHAR(30) NOT NULL,"
        + "fooLang CHAR(3) NOT NULL,"
        + "barWord VARCHAR(30) NOT NULL,"
        + "barLang CHAR(3) NOT NULL,"
        + "tags VARCHAR(30) NOT NULL"
        + ")"
      );

      // Create words table
      database.run(
        "CREATE TABLE tags("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
        + "name VARCHAR(30) NOT NULL"
        + ")"
      );

      // Insert example tags
      database.run(
        "INSERT INTO tags(name) VALUES"
        + '("Animals"),'
        + '("Fruits"),'
        + '("Computer science"),'
        + '("Greeting")'
      )

      // Insert example words
      database.run(
        "INSERT INTO words(fooWord, fooLang, barWord, barLang, tags) VALUES"
        + '("cat", "eng", "kissa", "fin", "1"),'
        + '("hund", "swe", "koira", "fin", "1"),'
        + '("kivi", "swe", "kiivi", "fin", "1,2"),'
        + '("pineapple", "eng", "ananas", "fin", "2"),'
        + '("unemployed", "eng", "työtön", "fin", "3"),'
        + '("olio", "fin", "object", "eng", "3"),'
        + '("()", "uni", "kaarisulkeet", "fin", "3"),'
        + '("[]", "uni", "hakasulkeet", "fin", "3"),'
        + '("{}", "uni", "aaltosulkeet", "fin", "3"),'
        + '("〈〉", "uni", "kulmasulkeet", "fin", "3"),'
        + '("foofoofoofoofoofoofoofoofoofoo", "eng", "barbarbarbarbarbarbarbarbarbar", "fin", "3"),'
        + '("untagged", "eng", "laputtamaton", "fin", "")'
      )
    });
  }
});

module.exports = database;