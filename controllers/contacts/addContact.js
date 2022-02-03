const CreateError = require('http-errors')
const contacts = require('../../models/contacts')
const contactsSchema = require('../../schemas/contacts')

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { name, email, phone } = req.body
    const result = await contacts.addContact(name, email, phone)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
