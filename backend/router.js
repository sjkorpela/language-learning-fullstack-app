
// Module dependencies
const express = require("express");

// Self-made dependencies
const handler = require("./handler.js");
const schema = require("./validation.js");

// Set up router
const router = express.Router();

// Define router routes, regionated for readability
// Should this be broken up into seperate files?

//#region /api

  /**
   * Is called when "url.com/" is get requested without further params.
   * Responds with status code 204: no content.
   */
  router.get("/api", async (request, respond) => {
    console.log("☎️ GET HOME start");

    respond.sendStatus(204); // "No content"

    console.log("☎️ GET HOME end");
  });

//#endregion

//#region /api/words

  //#region /api/words GET

    /**
     * Is called when "url.com/api/words/" is get requested without further params.
     * Responds with either json data or status code 400/500.
     */
    router.get("/api/words", async (request, respond) => {
      console.log(`☎️ GET WORDS start`);

      // No params to validate, send get all call to handler, parse data, ship it
      try {
        const result = await handler.GetAll("words");
        respond.status(200).send(result);
        console.log(`☎️ GET WORDS success`);
      } catch (e) {
        // If validation error, bad request, else internal server error
        console.log(`☎️ GET WORDS fail, error: `, e);
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ GET WORDS end`);
      }
    })

    /**
     * Is called when "url.com/api/words/{id}" is get requested.
     * Responds with either json data or status code 400/500.
     */
    router.get("/api/words/:wordId", async (request, respond) => {
      console.log(`☎️ GET WORD ID start, id:${request.params.wordId}`);

      // Parse params
      const id = request.params.wordId;

      // Validate params, and send get call to handler, parse data, ship it
      try {
        await schema.validateAsync({ "id": id })
        const result = await handler.GetRow("words", id);
        respond.status(200).send(result);
      } catch (e) {
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ GET WORD ID end`);
      }
    })

  //#endregion /api/words GET

  //#region /api/words POST

    /**
     * Is called when "url.com/api/words/" is post requested without further params.
     * Responds with either status code 201 or status code 400/500.
     */
    router.post("/api/words", async (request, respond) => {
      console.log(`☎️ POST WORD start`);

      // Parse params
      const params = {
        fooWord: request.body.fooWord,
        fooLang: request.body.fooLang,
        barWord: request.body.barWord,
        barLang: request.body.barLang,
        tags: request.body.tags
      }

      // Validate params, send post call to handler
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

        console.log("testi");
        const result = await handler.PostWord(params);
        console.log("toimi");
        respond.sendStatus(201);
      } catch (e) {
        console.log(e);
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ POST WORD end`);
      }
    })

  //#endregion /api/words POST

  //#region /api/words PUT

    /**
     * Is called when "url.com/api/words/{id}" is put requested.
     * Responds with either status code 201 or status code 400/500.
     */
    router.put("/api/words/:wordId", async (request, respond) => {
      console.log(`☎️ PUT WORD ID start, id:${request.params.wordId}`);

      // Parse params
      const params = {
        id: request.params.wordId,
        fooWord: request.body.fooWord,
        fooLang: request.body.fooLang,
        barWord: request.body.barWord,
        barLang: request.body.barLang,
        tags: request.body.tags
      }

      // Validate params, send post call to handler
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

        const result = await handler.PutWord(params);
        respond.sendStatus(200);
      } catch (e) {
        console.log(e);
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ PUT WORD ID end`);
      }
    })

  //#endregion /api/words PUT

  //#region /api/words DELETE

    /**
     * Is called when "url.com/api/words/{id}" is delete requested.
     * Responds with either status code 204 or status code 400/500.
     */
    router.delete("/api/words/:wordId", async (request, respond) => {
      console.log(`☎️ DELETE WORD ID start, id:${request.params.wordId}`);

      // Parse params
      const id = request.params.wordId;

      // Validate params, send post call to handler
      try {
        await schema.validateAsync({ "id": id })

        const result = await handler.DeleteRow("words", id);
        respond.sendStatus(204);
      } catch (e) {
        console.log(e);
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ DELETE WORD ID end`);
      }
    })

  //#endregion /api/words DELETE

  //#region /api/words PATCH

    /**
     * Is called when "url.com/api/words/{id}" is patch requested.
     * Responds with either status code 201 or status code 400/500.
     */
    router.patch("/api/words/:wordId", async (request, respond) => {
      console.log(`☎️ PATCH WORD ID start, id:${request.params.wordId}`);

      // Parse params
      const params = {
        fooLang: request.body.fooLang,
        fooWord: request.body.fooWord,
        barLang: request.body.barLang,
        barWord: request.body.barWord,
        tags: request.body.tags,
        id: parseInt(request.params.wordId)
      }

      // Validate params, send post call to handler
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

        if (params.id == undefined) {
          const error = new Error();
          error.name = "ValidationError"
          throw error;
        }

        const result = await handler.PatchWord(params);
        respond.sendStatus(201);
      } catch (e) {
        console.log(e);
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ PATCH WORD ID end`);
      }
    })

  //#endregion /api/words PATCH

//#endregion /api/words

//#region /api/tags

  //#region /api/tags GET

    /**
     * Is called when "url.com/api/tags/" is get requested without further params.
     * Responds with either json data or status code 400/500.
     */
    router.get("/api/tags", async (request, respond) => {
      console.log(`☎️ GET TAGS start`);

      // No params to validate, send get all call to handler, parse data, ship it
      try {
        const result = await handler.GetAll("tags");
        respond.status(200).send(result);
        console.log(`☎️ GET TAGS success`);
      } catch (e) {
        // If validation error, bad request, else internal server error
        console.log(`☎️ GET TAGS fail, error: `, e);
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ GET TAGS end`);
      }
    })

    /**
     * Is called when "url.com/api/tags/{id}" is get requested.
     * Responds with either json data or status code 400/500.
     */
    router.get("/api/tags/:tagId", async (request, respond) => {
      console.log(`☎️ GET TAG ID start, id:${request.params.tagId}`);

      // Parse params
      const id = request.params.tagId;

      // Validate params, and send get call to handler, parse data, ship it
      try {
        await schema.validateAsync({ "id": id })
        const result = await handler.GetRow("tags", id);
        respond.status(200).send(result);
      } catch (e) {
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ GET TAG ID end`);
      }
    })

  //#endregion /api/tags GET

  //#region /api/tags POST

    /**
     * Is called when "url.com/api/tags/" is post requested without further params.
     * Responds with either status code 201 or status code 400/500.
     */
    router.post("/api/tags", async (request, respond) => {
      console.log(`☎️ POST TAG start`);

      // Parse params
      const params = {
        name: request.body.name
      }

      // Validate params, send post call to handler
      try {

        await schema.validateAsync({ "tag": params.name })

        const result = await handler.PostTag(params);
        respond.sendStatus(201);
      } catch (e) {
        console.log(e);
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ POST TAG end`);
      }
    })

  //#endregion /api/tags POST

  //#region /api/tags PUT

    /**
     * Is called when "url.com/api/tags/{id}" is put requested.
     * Responds with either status code 201 or status code 400/500.
     */
    router.put("/api/tags/:tagId", async (request, respond) => {
      console.log(`☎️ PUT TAG ID start, id:${request.params.tagId}`);

      // Parse params
      const params = {
        id: request.params.tagId,
        name: request.body.name
      }

      // Validate params, send post call to handler
      try {

        await schema.validateAsync({
          "id": params.id,
          "tag": params.name
        })

        const result = await handler.PutTag(params);
        respond.sendStatus(201);
      } catch (e) {
        console.log(e);
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ PUT TAG ID end`);
      }
    })

  //#endregion /api/tags PUT

  //#region /api/tags DELETE

    /**
     * Is called when "url.com/api/tags/{id}" is delete requested.
     * Responds with either status code 204 or status code 400/500.
     */
    router.delete("/api/tags/:tagId", async (request, respond) => {
      console.log(`☎️ DELETE TAG ID start, id:${request.params.tagId}`);

      // Parse params
      const id = request.params.tagId;

      // Validate params, send post call to handler
      try {
        await schema.validateAsync({ "id": id })

        const result = await handler.DeleteRow("tags", id);
        respond.sendStatus(204);
      } catch (e) {
        console.log(e);
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ DELETE TAG ID end`);
      }
    })

  //#endregion /api/tags DELETE

  //#region /api/tags PATCH

    /**
     * Is called when "url.com/api/tags/{id}" is patch requested.
     * Responds with either status code 201 or status code 400/500.
     */
    router.patch("/api/tags/:tagId", async (request, respond) => {
      console.log(`☎️ PATCH TAG ID start, id:${request.params.tagId}`);

      // Parse params
      const params = {
        id: request.params.tagId,
        name: request.body.name
      }

      // Validate params, send post call to handler
      try {
        await schema.validateAsync({
          "id": params.id,
          "tag": params.name
        })

        if (params.id == undefined) {
          const error = new Error();
          error.name = "ValidationError"
          throw error;
        }

        const result = await handler.PatchTag(params);
        respond.status(201);
      } catch (e) {
        console.log(e);
        // If validation error, bad request, else internal server error
        respond.sendStatus((e.name === "ValidationError") ? 400 : 500);
      } finally {
        console.log(`☎️ PATCH TAG ID end`);
      }
    })

  //#endregion /api/tags PATCH

//#endregion /api/tags

module.exports = router;
