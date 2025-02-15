const express = require('express')
const authenticate = require('../../middlewares/authentication/authenticate')
const { upload, resize } = require('../../middlewares/upload')
const userCtrl = require('../../controllers/users')

const router = express.Router()

router.get('/current', authenticate, userCtrl.getCurrent)
router.get('/logout', authenticate, userCtrl.logoutUser)
router.patch('/', authenticate, userCtrl.updateSubscription)
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  resize,
  userCtrl.uploadAvatar,
)

module.exports = router
