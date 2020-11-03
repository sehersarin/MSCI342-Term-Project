const express = require('express');
const router = express.Router();

const publicController = require('./public');
const privateController = require('./private');

// Public actions such as sign up and login.
router.use('/public', publicController);

// Private user actions such as viewing specific appointments and booking appointments.
router.use('/api', privateController);

module.exports = router