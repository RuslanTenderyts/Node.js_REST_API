const ctrWrapper = require("../helpers/ctrlWrapper");
const validateBody = require("./validateBody");
const checkBody = require("./checkBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
    ctrWrapper,
    validateBody,
    checkBody,
    isValidId,
    authenticate,
    upload,
};