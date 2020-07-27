const Joi = require('@hapi/joi');


const companySchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string().required(),
    age: Joi.number(),
  });


module.exports = (obj) => companySchema.validate(obj, { allowUnknown: false });