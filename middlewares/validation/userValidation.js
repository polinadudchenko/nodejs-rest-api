const Joi = require('joi')

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const joiUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
})
module.exports = { registerJoiSchema, joiUpdateSubscriptionSchema }
