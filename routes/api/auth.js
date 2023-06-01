const express = require('express');

const { validateBody, checkBody, authenticate } = require('../../middlewares');

const schemas = require("../../schemas");

const ctrl = require('../../controller/auth');


const router = express.Router();

router.post('/register', checkBody, validateBody(schemas.reqisterSchema), ctrl.register);

router.post('/login', checkBody, validateBody(schemas.loginShema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/subscription', authenticate,  validateBody(schemas.updateSubscriptionSchems), ctrl.updateSubscription);

module.exports = router;