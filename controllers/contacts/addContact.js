const CreateError = require('http-errors')
const { Contact } = require('../../models/contacts')
const contactsSchema = require('../../middlewares/validation/contactValidation')

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const result = await Contact.create(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
