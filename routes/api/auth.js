const express = require('express');

const { validateBody, checkBody, authenticate, upload } = require('../../middlewares');

const schemas = require("../../schemas");

const ctrl = require('../../controller/auth');


const router = express.Router();

router.post('/register', checkBody, validateBody(schemas.reqisterSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verify)

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', checkBody, validateBody(schemas.loginShema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/subscription', authenticate,  validateBody(schemas.updateSubscriptionSchems), ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;