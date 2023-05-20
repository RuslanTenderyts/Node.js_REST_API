const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^[0-9 ()-]{10,14}$/).required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchems = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = {
    contactAddSchema,
    updateFavoriteSchems,
};