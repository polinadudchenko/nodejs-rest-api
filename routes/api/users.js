const express = require('express')
const { authenticate } = require('../../middlewares/authenticate')
const userCtrl = require('../../controllers/users')

const router = express.Router()

router.get('/current', authenticate, userCtrl.getCurrent)
router.get('/logout', authenticate, userCtrl.logoutUser)
router.patch('/', authenticate, userCtrl.updateSubscription)
module.exports = router
