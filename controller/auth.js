const User = require("../models/user")
const { HttpError } = require("../helpers");
const { ctrWrapper } = require("../middlewares");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { SECRET_KEY } = process.env;



const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
            throw HttpError(409, "Email in use");
        }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
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

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;

    const avatar = await Jimp.read(tempUpload)
    await avatar
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload)

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});
    

    res.json({
        avatarURL,
    })
}


module.exports = {
    register: ctrWrapper(register),
    login: ctrWrapper(login),
    getCurrent: ctrWrapper(getCurrent),
    logout: ctrWrapper(logout),
    updateSubscription: ctrWrapper(updateSubscription),
    updateAvatar: ctrWrapper(updateAvatar),
};