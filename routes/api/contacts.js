const express = require('express');
const contactsController = require("../../controller/contacts-controller");
const schemas = require("../../schemas");
const { validateBody, checkBody } = require("../../decorators");
const { isValidId } = require("../../decorators");
const router = express.Router();

router.get('/', contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getById);

router.post('/',  contactsController.addContact);

router.delete('/:contactId', isValidId, contactsController.removeContact);

router.put('/:contactId', isValidId, checkBody, validateBody(schemas.contactAddSchema), contactsController.updateContact);

router.patch('/:contactId/favorite', isValidId, checkBody, validateBody(schemas.updateFavoriteSchems), contactsController.updateFavorite);

module.exports = router;
