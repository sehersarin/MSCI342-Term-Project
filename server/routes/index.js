const express = require('express')
const router = express.Router()

// Public actions such as sign up and login.
router.use(require('./public'));

// Private user actions such as viewing specific appointments and booking appointments.
router.use(require('./private'));

module.exports = router