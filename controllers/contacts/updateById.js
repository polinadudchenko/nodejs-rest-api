const CreateError = require('http-errors')
const { Contact } = require('../../models/contacts')
const contactsSchema = require('../../middlewares/validation/contactValidation')

const updateById = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body)
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
