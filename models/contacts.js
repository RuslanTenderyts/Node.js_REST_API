const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require("nanoid");

const constactsPath = path.join(__dirname, "./contacts.json");
const updateContacts = (contact) => {fs.writeFile(constactsPath, JSON.stringify(contact, null, 2));}

const listContacts = async() => {
    const data = await fs.readFile(constactsPath);
    return JSON.parse(data);
}
  
const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId)
    return result || null;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    };

    const [result] = contacts.splice(index, 1);
    updateContacts(contacts);
    return result;
}

const addContact = async(data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    };
    
    contacts[index] = { id: contactId, ...body };
    updateContacts(contacts);
    return contacts[index];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}