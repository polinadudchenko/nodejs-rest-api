const fs = require('fs/promises')
const path = require('path')
const User = require('../../models/user')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')
const uploadAvatar = async (req, res, next) => {
  const { _id } = req.user
  const { path: tempUpload, filename } = req.file
  try {
    const [extension] = filename.split('.').reverse()
    const newFileName = `${_id}.${extension}`
    const resultUpload = path.join(avatarsDir, newFileName)

    await fs.rename(tempUpload, resultUpload)

    const avatarURL = path.join('avatars', newFileName)
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({
      avatarURL,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = uploadAvatar
