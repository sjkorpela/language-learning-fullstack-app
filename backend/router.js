
// Module dependencies
const express = require("express");

// Self-made dependencies
const handler = require("./handler.js");
const schema = require("./validation.js");

// Set up router
const router = express.Router();

// Define router routes, regionated for readability
// Should this be broken up into seperate files?

//#region /

/**
 * Is called when "url.com/" is get requested without further params.
 * Responds with status code 204: no content.
 */
router.get("/", async (request, respond) => {
  console.log("☎️ GET HOME start");

  respond.sendStatus(204); // "No content"

  console.log("☎️ GET HOME end");
});

//#endregion

//#region /tests

//#region GET

/**
 * Is called when "url.com/tests/" is get requested without further params.
 * Responds with either json data or status code 400/500.
 */
router.get("/tests", async (request, respond) => {
  console.log(`☎️ GET TESTS start`);

  // No params to validate, send get all call to handler, parse data, ship it
  try {
    const raw = await handler.GetAll("tests");
    const parsed = await raw.json();
    respond.status(200).send(parsed);
  } catch (e) {
    // If validation error, bad request, else internal server error
    respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
  } finally {
    console.log(`☎️ GET TESTS end`);
  }
})

/**
 * Is called when "url.com/tests/{id}" is get requested.
 * Responds with either json data or status code 400/500.
 */
router.get("/tests/:testId", async (request, respond) => {

  console.log(`☎️ GET TESTS ID start, id:${request.params.testId}`);

  // Parse params
  const id = request.params.testId;

  // Validate params, and send get call to handler, parse data, ship it
  try {
    await schema.validateAsync({ id: id })
    const raw = await handler.GetId("tests", id);
    const parsed = await raw.json();
    respond.status(200).send(parsed);
  } catch (e) {
    // If validation error, bad request, else internal server error
    respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
  } finally {
    console.log(`☎️ GET TESTS ID end, id:${request.params.testId}`);
  }
})

/**
 * Is called when "url.com/tests/{id}/submissions" is get requested.
 * Responds with either json data or status code 400/500.
 */
router.get("/tests/:testId/submissions", async (request, respond) => {

  console.log(`☎️ GET TESTS ID SUBMISSIONS start, id:${request.params.testId}`);

  // Parse params
  const id = request.params.testId;

  // Validate params, and send get call to handler, parse data, ship it
  try {
    await schema.validateAsync({ id: id })
    const raw = await handler.GetTestSubmissions("tests", id);
    const parsed = await raw.json();
    respond.status(200).send(parsed);
  } catch (e) {
    // If validation error, bad request, else internal server error
    respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
  } finally {
    console.log(`☎️ GET TESTS ID SUBMISSIONS end, id:${request.params.testId}`);
  }
})

//#endregion GET

//#endregion /tests

module.exports = router;
