const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');
const accountHandler = require('../models/handlers/account');

router.get('/public/login', async (req, res) => {
    // Validate appropriate parameters are passed into the login endpoint.
    const paramSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ca'] } }).max(320).required(),
        password: Joi.string().min(3).max(40).required()
    });

    const paramEmail = req.query.email ? req.query.email : null;
    const paramPassword = req.query.password ? req.query.password : null;

    const { error, value } = paramSchema.validate({ email: paramEmail, password: paramPassword });

    if (!_.isNil(error)) res.send(error);

    // New access tokens will only be generated upon sign up and user logout. 
    // The login event should not change the access token to prevent undesired logout from other devices.
    const user = await authenticateHandler.getUserFromCredentials(paramEmail, paramPassword);

    res.send(user);
});

router.get('/public/create-user', async (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const type = req.query.type; //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
    const studentID = req.query.studentID;
    const email = req.query.email;
    const password = req.query.password;
    const phone = req.query.phone;

    const user = await accountHandler.createUserAccount(firstName, lastName, type, studentID, email, password, phone);

    res.send(user);
});

module.exports = router 