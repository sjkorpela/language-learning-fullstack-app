const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number().integer().min(0),
});

module.exports = schema;