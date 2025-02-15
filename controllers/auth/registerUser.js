const CreateError = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { User } = require('../../models')
const { userValidation } = require('../../middlewares/validation')

const registerUser = async (req, res, next) => {
  try {
    const { error } = userValidation.registerJoiSchema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new CreateError(409, 'Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const avatarURL = gravatar.url(email)
    await User.create({ email, avatarURL, password: hashPassword })
    res.status(201).json({
      user: {
        email,
        subscription: 'starter',
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = registerUser
