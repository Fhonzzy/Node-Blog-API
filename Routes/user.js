const express = require('express')
const router = express.Router()
const {logIn,register, profile, logout} = require('../controller/user')

router.post('/register', register)
router.post('/login', logIn)
router.get('/profile', profile)
router.post('/logout', logout)

module.exports = router;