const CreateError = require('http-errors')
const { User } = require('../../models')
const { userValidation } = require('../../middlewares/validation')

const updateSubscription = async (req, res, next) => {
  try {
    if (!req.body) {
      throw new CreateError(400, 'missing field favorite')
    }
    const { error } = userValidation.joiUpdateSubscriptionSchema.validate(
      req.body,
    )
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { _id } = req.user
    const result = await User.findByIdAndUpdate(_id, req.body)
    if (!result) {
      throw new CreateError(404, 'Not found')
    }
    console.log(result)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = updateSubscription
