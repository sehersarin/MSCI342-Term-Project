const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');
const accountHandler = require('../models/handlers/account');

router.get('/login', async (req, res) => {
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

router.get('/create-user', async (req, res) => {
    // Validate appropriate parameters are passed into the create account endpoint.
    //The following joi verifications make sure the values inputted adhere to the format requirements
    //specified in the migrations> create-worker-table and migrations> create-student-table.
    const paramSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ca'] } }).max(320).required(),
        password: Joi.string().min(3).max(40).required(),
        phone: Joi.string().max(20),
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        studentId: Joi.number().positive().integer(),
        workerId: Joi.number().positive().integer(),
        schoolId: Joi.number().positive().integer(),
        userType: Joi.string().min(1).valid('student', 'worker'),
        type: Joi.string(),
        specialization: Joi.string(),//verify options
    }).xor('studentId', 'workerId') // Either the studentId or the workerId must be specified (they both cannot be specified).
        .xor('schoolId', 'specialization'); // Either the schoolId or the specialization must be specified (they both cannot be specified).  

    // the endpoint `/api/create-user` accepts ALL parameters for both user types, 
    //as listed in the migrations> create-worker-table and migrations> create-student-table
    const paramFirstName = req.query.firstName;
    const paramLastName = req.query.lastName;
    const paramType = req.query.type; //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
    const paramStudentId = req.query.studentId;//Students only
    const paramWorkerId = req.query.workerId;//Workers only
    const paramEmail = req.query.email;
    const paramPassword = req.query.password;
    const paramPhone = req.query.phone;
    const paramUserType = req.query.userType;
    const paramSchoolId = req.query.schoolId; //Students only
    const paramSpecialization = req.query.specialization; //Workers only

    //error check
    const { error, value } = paramSchema.validate({ email: paramEmail, password: paramPassword, firstName: paramFirstName, lastName: paramLastName, type: paramType, studentId: paramStudentId, workerId: paramWorkerId, phone: paramPhone, schoolId: paramSchoolId, specialization: paramSpecialization, userType: paramUserType });
    if (!_.isNil(error)) res.send(error);

    const user = await accountHandler.createUserAccount(paramFirstName, paramLastName, paramType, paramStudentId, paramEmail, paramPassword, paramPhone, paramUserType, paramWorkerId, paramSpecialization, paramSchoolId);

    res.send(user);
});

module.exports = router;