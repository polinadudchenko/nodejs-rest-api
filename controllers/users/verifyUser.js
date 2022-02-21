const User = require('../../models/user')
const CreateError = require('http-errors')

const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params
    const user = User.findOne({ verificationToken })
    if (!user) {
      throw new CreateError(404, 'User not found')
    }
    User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' })
    res.json({
      message: 'Verification successful',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verifyUser
