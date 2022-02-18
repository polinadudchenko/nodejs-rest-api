const Jimp = require('jimp')

const resize = async (req, res, next) => {
  const { path: tempUpload } = req.file
  try {
    const avatar = await Jimp.read(`${tempUpload}`)
    await avatar.resize(250, 250).quality(75)
    await avatar.writeAsync(`${tempUpload}`)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = resize
