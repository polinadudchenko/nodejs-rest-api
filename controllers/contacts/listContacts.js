const { Contact } = require('../../models/contacts')

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt')
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
