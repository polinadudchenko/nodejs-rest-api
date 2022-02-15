const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  try {
    const { _id } = req.user
    const result = await Contact.find(
      { owner: _id },
      '-createdAt -updatedAt',
    ).populate('owner', 'email')
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
