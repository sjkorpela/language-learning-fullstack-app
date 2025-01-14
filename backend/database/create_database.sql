-- This to be run when setting up a server. Creates the SQL database to be used by the server and fills it with some example data.
-- mysql -u root -p < create_database.sql

-- Create the database
CREATE DATABASE llfsa;

USE llfsa;

-- Create the words table:
-- - id       -> Id of the word, as an integer 1 or greater
-- - fooWord  -> The left side word, string max 30 characters
-- - fooLang  -> Language that the word, as a 3 char string using ISO 639-3 language codes set 3, https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
-- - barWord  -> The right side word, string max 30 characters
-- - barLang  -> Language that the word, as a 3 char string same as fooLang
-- - tags     -> Tags of the ford, as a string with format #,#,# where each # is a tag id, see tags table
CREATE TABLE words(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fooWord VARCHAR(30) NOT NULL,
  fooLang CHAR(3) NOT NULL,
  barWord VARCHAR(30) NOT NULL,
  barLang CHAR(3) NOT NULL,
  tags  VARCHAR(30) NOT NULL
);

-- Create the tags table:
-- - id    -> Id of the tag, as an integer 1 or greater
-- - name  -> Name of the tag, string max 30 characters
CREATE TABLE tags(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Insert example data

INSERT INTO tags(name) VALUES
  ("Animals"),
  ("Fruits"),
  ("Computer science");

-- Languages
-- eng -> english
-- fin -> finnish
-- swe -> swedish
-- uni -> unicode character

-- Tags
-- 1 -> animals
-- 2 -> fruits
-- 3 -> computer science

INSERT INTO words(fooWord, fooLang, barWord, barLang, tags) VALUES
  ("cat", "eng", "kissa", "fin", "1"),
  ("hund", "swe", "koira", "dog", "1"),
  ("kivi", "swe", "kiivi", "fin", "1,2"),
  ("pineapple", "eng", "ananas", "fin", "2"),
  ("unemployed", "eng", "työtön", "fin", "3"),
  ("olio", "fin", "object", "eng", "3"),
  ("()", "uni", "kaarisulkeet", "fin", "3"),
  ("[]", "uni", "hakasulkeet", "fin", "3"),
  ("{}", "uni", "aaltosulkeet", "fin", "3"),
  ("〈〉", "uni", "kulmasulkeet", "fin", "3"),
  ("foofoofoofoofoofoofoofoofoofoo", "eng", "barbarbarbarbarbarbarbarbarbar", "fin", "3");
