const CreateError = require('http-errors')
const { userValidation } = require('../../middlewares/validation')
const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const sendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = userValidation.joiVerifyEmailSchema.validate(req.body)
    if (error) {
      throw CreateError(400, 'missing required field email')
    }
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user.verify) {
      throw CreateError(400, 'Verification has already been passed')
    }
    const mail = {
      to: email,
      subject: 'Verify Email',
      html: `<a target="_blank" href='http://localhost:5000/api/users/verify/${user.verificationToken}'>Click here to verify your Email</a>`,
    }
    sendMail(mail)
    res.json({
      message: 'Verification email sent',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = sendVerifyEmail
