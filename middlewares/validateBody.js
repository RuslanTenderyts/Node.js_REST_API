const { HttpError } = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if(error) {
            let newMessage = error.message.split('"');
            if(["name", "phone", "email"].includes(newMessage[1])) {
                newMessage = `missing required ${newMessage[1]} field`;
                next(HttpError(400, newMessage));
            } else {
                next(HttpError(400, error.message));
            }
        };
        next();
    }
    return func;
};

module.exports = validateBody;