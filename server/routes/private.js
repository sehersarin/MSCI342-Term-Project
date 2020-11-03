const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');
const appointmentHandler = require('../models/handlers/appointment');
const workerTimeslotHandler = require('../models/handlers/timeslot');
const availabilityHandler = require('../models/handlers/availability');

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

    const { error } = paramSchema.validate({ studentId, workerTimeslotId, purpose, studentNotes, workerComments });

    if (!_.isNil(error)) res.send(error);

    // Attempts to insert the appointment into the database.
    const isSuccessfullyInserted = await appointmentHandler.bookAppointment(studentId, workerTimeslotId, purpose, studentNotes, workerComments);

    res.send(isSuccessfullyInserted);

});

router.post('/api/add-recurring-schedule', async (req, res) => {
    // Validate appropriate parameters are passed into add recurring schedule. 
    const paramSchema = Joi.object({
        slotId: Joi.number().integer().required(), //The worker must specify the slot they are available in
        schoolId: Joi.number().integer().required(), //The worker must specify the corresponding school they are working at with an ID 
        workerId: Joi.number().integer().required(), //The worker must specify their ID 
        status: Joi.string().max(30), // The default value is available which is handled by the database Create Table logic. 
        date: Joi.date().iso().required(), //Enables the worker to select weekdays (Monday to Friday) and add in schedule for each corresponding day of the week
    });

    const query = req.query ? req.query : {};

    const slotId = query.slotId ? query.slotId : null;
    const schoolId = query.schoolID ? query.schoolID : null;
    const workerId = query.workerID ? query.workerID : null;
    const status = query.status ? query.status : null;
    const date = query.date ? query.date : null;

    const { error } = paramSchema.validate({ workerTimeslotId, slotId, schoolId, workerId, status, date });

    if (!_.isNil(error)) res.send(error);

    // Attempts to insert the worker availability into the database 
    const isSuccessfullyInserted = await workerTimeslotHandler.addWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date);

    res.send(isSuccessfullyInserted);
});

router.post('/api/worker-availability', async (req, res) => {
    const paramSchema = Joi.object({
        workerId: Joi.number().integer().required(),
        schoolId: Joi.number().integer().allow(null),
        startTime: Joi.date().iso(),
        endTime: Joi.date().iso().greater(Joi.ref('startTime'))
    });

    const query = req.query ? req.query : {};

    const workerId = query.workerId ? query.workerId : null;
    const schoolId = query.schoolId ? query.schoolId : null;
    const startTime = query.startTime ? query.startTime : null;
    const endTime = query.endTime ? query.endTime : null;

    const { error } = paramSchema.validate({ workerId, schoolId, startTime, endTime });

    if (!_.isNil(error)) res.send(error);

    const availableTimes = await availabilityHandler.getWorkerAvailability(workerId, schoolId, startTime, endTime);

    res.send(availableTimes);

});

router.get('/test', async (req, res) => {
    res.send(true);
});

router.post('/api/add-recurring-schedule', async (req, res) => {


    // Validate appropriate parameters are passed to view workers at each school 
    const getWorkersForSchool = Joi.object({
        schoolId: Joi.number().integer().required(), //The student must specify their school ID in order to view the workers
    });

    const query = req.query ? req.query : {};

    const schoolId = query.schoolId ? query.schoolId : null;

    const { error } = paramSchema.validate({schoolId});

    if (!_.isNil(error)) res.send(error);

    // Attempts to insert the available workers at each school 
    const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(schoolId);

    res.send(isSuccessfullyInserted);
});

module.exports = router