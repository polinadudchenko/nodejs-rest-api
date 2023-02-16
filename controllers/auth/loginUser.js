const CreateError = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')
const { userValidation } = require('../../middlewares/validation')

const { SECRET_KEY } = process.env

const loginUser = async (req, res, next) => {
  try {
    const { error } = userValidation.registerJoiSchema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new CreateError(401, 'Email or password is wrong')
    }
    if (!user.verify) {
      throw new CreateError(401, 'Email not verify')
    }
    const comparePassword = bcrypt.compare(password, user.password)
    if (!comparePassword) {
      throw new CreateError(401, 'Email or password is wrong')
    }
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await User.findByIdAndUpdate(user._id, { token })
    res.json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = loginUser
