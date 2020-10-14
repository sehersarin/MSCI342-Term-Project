const express = require('express');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');

// Binds a middleware to check access tokens for all private requests.
router.use(async function (req, res, next) {
    const isValid = await authenticateHandler.isAccessTokenValid(req.query.accessToken);

    try {
        if (!isValid) throw new Error('Invalid Access Token!');
        next();
    } catch (err) {
        next(err);
    }
});

router.get('/test', async(req, res) => {
    res.send(true);
});

module.exports = router 