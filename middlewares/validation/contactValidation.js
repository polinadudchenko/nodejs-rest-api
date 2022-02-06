const Joi = require('joi')

const joiAddContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
})

const joiUpdateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
  ),
  favorite: Joi.boolean(),
})

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {
  add: joiAddContactSchema,
  update: joiUpdateContactSchema,
  updateFavorite: joiUpdateFavoriteSchema,
}
