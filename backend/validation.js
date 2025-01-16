const Joi = require("joi");

// IDs must be integers 1 or greater
// Languages must be exactly 3 characters
// Words, tag names, and taglists must be between 1 and 30 characters, nts: change to 50?
// Table name must be one of existing ones

const schema = Joi.object({
  id: Joi.number().integer().min(1),
  lang: Joi.string().min(1).max(30),
  word: Joi.string().min(1).max(30),
  tag: Joi.string().min(1).max(30),
  tags: Joi.string().min(1).max(30),
  table: Joi.string().valid("words", "tags")
});

module.exports = schema;