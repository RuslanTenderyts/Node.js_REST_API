const Contact = require("../models/contact")
const { HttpError } = require("../helpers");
const { ctrWrapper } = require("../middlewares");
const { sortValue } = require("../helpers")


const listContacts = async (req, res) => {
      const {_id: owner} = req.user;
      const {sort = "ascending", page = 1, limit = 20} = req.query;
      const skip = (page - 1) * limit;
      const result = await Contact.find({ owner }).sort({ name: sortValue(sort)}).skip(skip).limit(limit);
      res.json(result);
};

const getById = async (req, res) => {
      const {contactId} = req.params; 
      const result = await Contact.findById(contactId);
      if (!result) {
          throw HttpError(404, "Not found" )
      }
      res.json(result)
};

const addContact = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result)
};

const removeContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw HttpError(404, "Not found" )
    }
    res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found" )
    }
    res.json(result)
};

const updateFavorite = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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
    updateFavorite: ctrWrapper(updateFavorite),
};