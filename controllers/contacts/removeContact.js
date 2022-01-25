const fs = require('fs/promises')
const path = require('path')
const listContacts = require('./listContacts')

const contactsPath = path.join(__dirname, 'contacts.json')

const removeContact = async contactId => {
  const contacts = await listContacts()
  const contactIdx = contacts.findIndex(
    item => item.id === contactId.toString(),
  )
  if (contactIdx === -1) {
    return null
  }
  const contactToDelete = contacts[contactIdx]
  contacts.splice(contactIdx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contactToDelete
}

module.exports = removeContact
