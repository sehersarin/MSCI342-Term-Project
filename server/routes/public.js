const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');
const accountHandler = require('../models/handlers/account');

router.get('/api/login', async (req, res) => {
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

router.get('/api/create-user', async (req, res) => {
    // joi verification
    // Validate appropriate parameters are passed into the create account endpoint.
    const paramSchema = Joi.object({
       
       //The following joi verifications make sure the values inputted adhere to the format requirements
       //specified in the migrations> create-worker-table and migrations> create-student-table.

        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ca'] } }).max(320).required(),
        password: Joi.string().min(3).max(40).required(),
        phone: Joi.string().max(20).phoneNumber(),
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        studentId: Joi.number().positive().integer(),
        workerId: Joi.number().positive().integer(),
        userType: Joi.string().min(1).valid(['student', 'worker']),
        specialization: Joi.string().valid(['social worker', 'guidance councellor']),//verify options
        accessToken: Joi.string().alphanum().min(3).max(30).required(), 
        //insert joi verification for firstname,lastname, type,studentID,workerID,phone
    });
    // the endpoint `/api/create-user` accepts ALL parameters for both user types, 
    //as listed in the migrations> create-worker-table and migrations> create-student-table

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const type = req.query.type; //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
    const studentId = req.query.studentID;//Students only
    const workerId = req.query.workerID;//Workers only
    const email = req.query.email;
    const password = req.query.password;
    const phone = req.query.phone;
    const school_id = req.query.school_id; //Students only
    const specialization = req.query.specialization; //Workers only
    const accessToken = req.query.accessToken; //is this needed? If yes, add to worker.js line 18 and student.js line 17

   

    //error check
    const { error, value } = paramSchema.validate({ email: paramEmail, password: paramPassword, firstName: paramFirstName,lastName: paramLastName, });
    if (!_.isNil(error)) res.send(error);


    const user = await accountHandler.createUserAccount(firstName, lastName, type, studentId, email, password, phone,workerId,school_id,specialization,accessToken);

    res.send(user);
});

module.exports = router 