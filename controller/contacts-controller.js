const contactsService = require("../models/contacts")
const { HttpError } = require("../helpers");
const { ctrWrapper } = require("../decorators");


const listContacts = async (req, res) => {
      const result = await contactsService.listContacts();
      res.json(result);
};

const getById = async (req, res) => {
      const {contactId} = req.params;
      const result = await contactsService.getContactById(contactId);
      if (!result) {
          throw HttpError(404, "Not found" )
      }
      res.json(result)
};

const addContact = async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result)
};

const removeContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
        throw HttpError(404, "Not found" )
    }
    res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    console.log(result);
    if (!result) {
        throw HttpError(404, "Not found" )
    }
    res.json(result)
};

module.exports = {
    listContacts: ctrWrapper(listContacts),
    getById: ctrWrapper(getById),
    addContact: ctrWrapper(addContact),
    removeContact: ctrWrapper(removeContact),
    updateContact: ctrWrapper(updateContact),
};