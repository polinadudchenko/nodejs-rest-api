const CreateError = require('http-errors')
const { Contact } = require('../../models')
const { contactValidation } = require('../../middlewares/validation')

const updateStatusContact = async (req, res, next) => {
  try {
    if (!req.body) {
      throw new CreateError(400, 'missing field favorite')
    }
    const { error } = contactValidation.updateFavorite.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    })
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatusContact
