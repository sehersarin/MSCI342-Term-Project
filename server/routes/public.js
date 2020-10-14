const express = require('express');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');

router.get('/api/login', async(req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    const user = await authenticateHandler.getUserFromCredentials(email, password);

    res.send(user);
});

module.exports = router 