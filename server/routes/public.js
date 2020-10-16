const express = require('express');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');

router.get('/api/login', async(req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    // New access tokens will only be generated upon sign up and user logout. 
    // The login event should not change the access token to prevent undesired logout from other devices.
    const user = await authenticateHandler.getUserFromCredentials(email, password);

    res.send(user);
});

module.exports = router 