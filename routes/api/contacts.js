const express = require('express');
const contactsController = require("../../controller/contacts-controller");
const schemas = require("../../schemas");
const { validateBody, checkBody, authenticate } = require("../../middlewares");
const { isValidId } = require("../../middlewares");
const router = express.Router();

router.get('/', authenticate, contactsController.listContacts);

router.get("/:contactId", authenticate, isValidId, contactsController.getById);

router.post('/', authenticate, validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete('/:contactId', authenticate, isValidId, contactsController.removeContact);

router.put('/:contactId', authenticate, isValidId, checkBody, validateBody(schemas.contactAddSchema), contactsController.updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchems), contactsController.updateFavorite);

module.exports = router;
