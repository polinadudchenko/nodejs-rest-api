const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const removeContact = require('./removeContact')
const updateById = require('./updateById')
const updateStatus = require('./updateStatusContact')

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
  updateStatus,
}
