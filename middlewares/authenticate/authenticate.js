const CreateError = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const { authenticate = ' ' } = req.headers
    const [bearer, token] = authenticate.split(' ')
    if (bearer !== 'Bearer') {
      throw new CreateError(401, 'Not authorized')
    }
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = User.findById(id)
    if (!user || !user.token) {
      throw new CreateError(401, 'Not authorized')
    }
    req.user = user
    next()
  } catch (error) {
    if (!error.status) {
      error.status = 401
      error.message = 'Not authorized'
    }
    next(error)
  }
}

module.exports = authenticate
