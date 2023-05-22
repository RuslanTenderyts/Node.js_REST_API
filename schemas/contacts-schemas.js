const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchems = Joi.object({
    favorite: Joi.boolean().messages({"any.required": `missing field favorite`}).required(),
});

module.exports = {
    contactAddSchema,
    updateFavoriteSchems,
};