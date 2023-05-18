const express = require('express');
const contactsController = require("../../controller/contacts-controller");
const schemas = require("../../schemas");
const { validateBody, checkBody } = require("../../decorators");

const router = express.Router();

router.get('/', contactsController.listContacts);

router.get("/:contactId", contactsController.getById);

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete('/:contactId', contactsController.removeContact);

router.put('/:contactId', checkBody, validateBody(schemas.contactAddSchema), contactsController.updateContact);

module.exports = router;
