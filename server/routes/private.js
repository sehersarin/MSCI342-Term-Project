const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');
const appointmentHandler = require('../models/handlers/appointment');
const workerTimeslotHandler = require('../models/handlers/workerTimeslot');

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

router.post('/api/book-appointment', async (req, res) => {
    // Validate appropriate parameters are passed into the book appointment endpoint.
    // Verification to make sure appointments are only made for future dates and that the worker is available during that time will be handled by the front end.
    const paramSchema = Joi.object({
        studentId: Joi.number().integer().required(),
        workerTimeslotId: Joi.number().integer().required(),
        purpose: Joi.string().max(300).required(),
        studentNotes: Joi.string().allow(null).max(300),
        workerComments: Joi.string().allow(null).max(300)
    });

    const query = req.query ? req.query : {};

    const studentId = query.studentId ? query.studentId : null;
    const workerTimeslotId = query.workerTimeslotId ? query.workerTimeslotId : null;
    const purpose = query.purpose ? query.purpose : null;
    const studentNotes = query.studentNotes ? query.studentNotes : null;
    const workerComments = query.workerComments ? query.workerComments : null;

    const { error } = paramSchema.validate({studentId, workerTimeslotId, purpose, studentNotes, workerComments});

    if (!_.isNil(error)) res.send(error);

    // Attempts to insert the appointment into the database.
    const isSuccessfullyInserted = await appointmentHandler.bookAppointment(studentId, workerTimeslotId, purpose, studentNotes, workerComments);

    res.send(isSuccessfullyInserted);

});

router.post('/api/recurring_schedule', async (req, res) => {
    // Validate appropriate parameters are passed into the book appointment endpoint.
    // Verification to make sure appointments are only made for future dates and that the worker is available during that time will be handled by the front end.
    const paramSchema = Joi.object({
        
        workerTimeslotId: Joi.number().integer().required(),
        slotId: Joi.number().integer().required(),
        schoolId: Joi.number().integer().required(),
        workerId: Joi.number().integer().required(), 
        status:Joi.string().max(300).required(),
        date: Joi.string().allow(null).max(300)

        
    });

    const query = req.query ? req.query : {};

    const workerTimeslotId = query.workerTimeslotId ? query.workerTimeslotId : null;
    const slotId = query.slotId ? query.slotId : null;
    const schoolId = query.schoolID ? query.schoolID : null;
    const workerId = query.workerID ? query.workerID : null;
    const status = query.status ? query.status : null;
    const date = query.date ? query.date: null; 

    const { error } = paramSchema.validate({workerTimeslotId, slotId, schoolId, workerId, status, date});

    if (!_.isNil(error)) res.send(error);

    // Attempts to insert the appointment into the database.
    const isSuccessfullyInserted = await workerTimeslotHandler.addWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date);

    res.send(isSuccessfullyInserted);

});

router.get('/test', async (req, res) => {
    res.send(true);
});

module.exports = router 