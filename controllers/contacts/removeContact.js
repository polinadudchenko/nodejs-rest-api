const CreateError = require('http-errors')
const contacts = require('../../models/contacts')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    res.json({ message: 'Contact deleted' })
  } catch (error) {
    next(error)
  }
}
module.exports = removeContact
