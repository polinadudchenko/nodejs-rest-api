const CreateError = require('http-errors')
const { Contact } = require('../../models')
const { contactValidation } = require('../../middlewares/validation')

const addContact = async (req, res, next) => {
  try {
    const { error } = contactValidation.add.validate(req.body)
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
