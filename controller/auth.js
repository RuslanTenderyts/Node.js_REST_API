const User = require("../models/user")
const { HttpError } = require("../helpers");
const { ctrWrapper } = require("../middlewares");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
            throw HttpError(409, "Email in use");
        }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});
    res.status(201).json({ 
        user: {       
          email: newUser.email,
          subscription: newUser.subscription,
        }
    })
};
const login = async(req, res) => {
    const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password invalid");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw HttpError(401, "Email or password invalid");
        }

        const payload = {
            id: user._id,
        };
        
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h"});
        await User.findByIdAndUpdate(user._id, {token});

        res.json({
            token,
            user: {
                email,
                subscription: user.subscription,
            }
        })
    };

const getCurrent = async (req, res) => {
    const {email, subscription } = req.user;

    res.json({
            email,
            subscription,
        })
};

const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).send()
};

const updateSubscription = async (req, res) => {
    const {_id} = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(_id, { subscription }, {new: true});
   
    res.json({        
        email: user.email,
        subscription: user.subscription,
    })
};


module.exports = {
    register: ctrWrapper(register),
    login: ctrWrapper(login),
    getCurrent: ctrWrapper(getCurrent),
    logout: ctrWrapper(logout),
    updateSubscription: ctrWrapper(updateSubscription),
};