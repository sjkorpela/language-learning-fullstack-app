
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
        + "fooLang VARCHAR(30) NOT NULL,"
        + "barWord VARCHAR(30) NOT NULL,"
        + "barLang VARCHAR(30) NOT NULL,"
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
        + '("cat", "English", "kissa", "Finnish", "1"),'
        + '("hund", "Swedish", "koira", "Finnish", "1"),'
        + '("kivi", "Swedish", "kiivi", "Finnish", "1,2"),'
        + '("pineapple", "English", "ananas", "Finnish", "2"),'
        + '("unemployed", "English", "työtön", "Finnish", "3"),'
        + '("olio", "Finnish", "object", "English", "3"),'
        + '("()", "Characters", "kaarisulkeet", "Finnish", "3"),'
        + '("[]", "Characters", "hakasulkeet", "Finnish", "3"),'
        + '("{}", "Characters", "aaltosulkeet", "Finnish", "3"),'
        + '("〈〉", "Characters", "kulmasulkeet", "Finnish", "3"),'
        + '("foofoofoofoofoofoofoofoofoofoo", "English", "barbarbarbarbarbarbarbarbarbar", "Finnish", "3"),'
        + '("untagged", "eng", "laputtamaton", "Finnish", "")'
      )
    });
  }
});

module.exports = database;