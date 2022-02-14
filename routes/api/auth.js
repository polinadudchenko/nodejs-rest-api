const express = require('express')

const router = express.Router()
const userCtrl = require('../../controllers/users')

router.post('/signup', userCtrl.registerUser)
router.post('/login', userCtrl.loginUser)

module.exports = router
