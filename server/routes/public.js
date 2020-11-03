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
        first_name: Joi.string().min(1).max(20).required(),
        last_name: Joi.string().min(1).max(20).required(),
        student_id: Joi.number().positive().integer(),
        worker_id: Joi.number().positive().integer(),
        userType: Joi.string().min(1).valid(['student', 'worker']),
        specialization: Joi.string().valid(['social worker', 'guidance councellor']),//verify options
        access_token: Joi.string().alphanum().min(3).max(30).required(), 
        //insert joi verification for first_name,last_name, type,student_id,workerID,phone
    });
    // the endpoint `/api/create-user` accepts ALL parameters for both user types, 
    //as listed in the migrations> create-worker-table and migrations> create-student-table

    const paramFirst_name = req.query.first_name;
    const paramLast_name = req.query.last_name;
    const paramType = req.query.type; //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
    const paramStudent_id = req.query.student_id;//Students only
    const paramWorker_id = req.query.worker_id;//Workers only
    const paramEmail = req.query.email;
    const paramPassword = req.query.password;
    const paramPhone = req.query.phone;
    const paramSchool_id = req.query.school_id; //Students only
    const paramSpecialization = req.query.specialization; //Workers only
   //const access_token = req.query.access_token; //is this needed? If yes, add to worker.js line 18 and student.js line 17

   

    //error check
    const { error, value } = paramSchema.validate({ email: paramEmail, password: paramPassword, first_name: paramFirst_name,last_name: paramLast_name, type: paramType, student_id: paramStudent_id, worker_id: paramWorker_id, phone: paramPhone, school_id: paramSchool_id, specialization: paramSpecialization});
    if (!_.isNil(error)) res.send(error);


    const user = await accountHandler.createUserAccount(first_name, last_name, type, student_id, email, password, phone,worker_id,school_id,specialization);

    res.send(user);
});

module.exports = router 