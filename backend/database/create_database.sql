-- This to be run when setting up a server. Creates the SQL database to be used by the server and fills it with some example data.

-- Create the database
CREATE DATABASE llfsa;

USE llfsa;

-- Languages could be stored as an SQL enum?

-- Create the tests table:
-- - id           -> Id of the test, as an integer 0 or greater
-- - test_lang    -> Language that the test is testing, as a 3 char string using ISO 639-3 language codes, https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
-- - answ_lang    -> Language that the test is answered in, as the same as test_lang
-- - title        -> Name of the test, as a string 5-50 chars long
-- - descript     -> Description of the test's subject, as a text
-- - last_edited  -> When the test was last edited, as a timestamp
-- - edited_by(?) -> Who the test was edited by, as a user id
CREATE TABLE tests(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  test_lang CHAR(3) NOT NULL,
  answ_lang CHAR(3) NOT NULL,
  title VARCHAR(50) NOT NULL,
  descript TEXT NOT NULL,
  last_edited TIMESTAMP NOT NULL
  -- edited_by INT NOT NULL,
  -- FOREIGN KEY(edited_by) REFERENCES user(id)
);

-- Test taker is just a string -> taking the test for someone else is possible, maybe fix later?

-- Create the submissions table:
-- - id          -> Id of the submission, as an integer 0 or greater
-- - test_id     -> Which test this is a submission for, as a test id
-- - taker       -> Who the submissions is by, as a string 5-50 chars long
-- - submit_time -> Time the submission is sent, as a timestamp
CREATE TABLE submissions(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  test_id INT NOT NULL, FOREIGN KEY(test_id) REFERENCES tests(id),
  taker VARCHAR(50) NOT NULL,
  submit_time TIMESTAMP NOT NULL
);

INSERT INTO tests(id, test_lang, answ_lang, title, descript, last_edited) VALUES
  (0, "eng", "fin", "Test test", "A test test to test the test table.", "2024-12-13 14:10:00")