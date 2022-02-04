const CreateError = require('http-errors')
const { Contact } = require('../../models/contacts')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndDelete(contactId)
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    res.json({ message: 'Contact deleted' })
  } catch (error) {
    next(error)
  }
}
module.exports = removeContact
