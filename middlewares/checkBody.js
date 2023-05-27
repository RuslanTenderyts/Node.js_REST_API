const { HttpError } = require("../helpers");

const checkBody = (req, res, next) => {
  const isBody = JSON.stringify(req.body) === "{}";
  if (isBody) {
    throw HttpError(400, "missing fields");
  }
  next();
};

module.exports = checkBody;