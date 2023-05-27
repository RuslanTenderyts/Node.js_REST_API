const Joi = require("joi");

const reqisterSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business').messages({"any.required": `'starter', 'pro', 'business'`}),
});

const loginShema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required()
});

const updateSubscriptionSchems = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').messages({"any.required": `'starter', 'pro', 'business'`}).required(),
});

module.exports = {
    reqisterSchema,
    loginShema,
    updateSubscriptionSchems,
};