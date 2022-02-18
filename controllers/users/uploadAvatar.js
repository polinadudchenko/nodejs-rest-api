const fs = require('fs/promises')
const path = require('path')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')
const uploadAvatar = async (req, res, next) => {
  try {
    console.log('aaa')
  } catch (error) {
    next(error)
  }
}

module.exports = uploadAvatar
