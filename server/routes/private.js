const express = require('express');
const _ = require('lodash');
const Joi = require('joi');

const router = express.Router();

const authenticateHandler = require('../models/handlers/authenticate');
const appointmentHandler = require('../models/handlers/appointment');
const workerTimeslotHandler = require('../models/handlers/workerTimeslot');
const TimeslotHandler = require('../models/handlers/timeslot');
const availabilityHandler = require('../models/handlers/availability');
const schoolHandler = require('../models/handlers/school');

const TimeslotStatus  = require('../constants/timeslotStatus.json');

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

router.post('/book-appointment', async (req, res) => {
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

router.post('/add-recurring-schedule', async (req, res) => {
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
    const schoolId = query.schoolId ? query.schoolId : null;
    const workerId = query.workerId ? query.workerId : null;
    const status = query.status ? query.status : TimeslotStatus.available;
    const date = query.date ? query.date : null;

    const { error } = paramSchema.validate({ slotId, schoolId, workerId, status, date });

    if (!_.isNil(error)) res.send(error);

    // Attempts to insert the worker availability into the database 
    const isSuccessfullyInserted = await workerTimeslotHandler.addWorkerTimeslot(slotId, schoolId, workerId, status, date);

    res.send(isSuccessfullyInserted);
});

router.post('/worker-availability', async (req, res) => {
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

// Returns all the appointments/meetings for a given student or worker.
// Note that appointments/meetings are synonymous, but only appointments will be used in the backend to maintain consistency.
router.get('/appointments', async (req, res) => {
    const paramSchema = Joi.object({
        studentId: Joi.number().integer(),
        workerId: Joi.number().integer(),
        status: Joi.array().items(Joi.string().min(1).max(300)) // Optional parameter and will default to only upcoming if not specified.
    }).xor('studentId', 'workerId'); // Either the studentId or the workerId must be specified (they both cannot be specified).

    const query = req.query ? req.query : {};

    const studentId = query.studentId;
    const workerId = query.workerId;
    // Should leave the status as is if it is null/undefined/already an array. Else, converts it to an array 
    // Due to Postman limitations to work around passing in an array in the query params.
    const status = (_.isNil(query.status) || _.isArray(query.status)) ? query.status : [query.status];

    const { error } = paramSchema.validate({ studentId, workerId, status });

    if (!_.isNil(error)) res.send(error);

    // Leverages the same method for the student and worker appointments as they have a similar query structure (to reduce redundancy and size of response).
    // Note that this method return details beyond the bare appointment details and thus were not named as only getAppointments to avoid confusion.
    const appointmentDetails = await appointmentHandler.getAppointmentDetails(studentId, workerId, status);

    res.send(appointmentDetails);
});



// The method will return all timeslots in the timeslot table 
//Note that there is an future opportunity to expand functionality of this endpoint to filter the records pulled based on start time or end time of the timeslot 
router.get('/possible-timeslots', async (req, res) => {
    
    timeslots = await TimeslotHandler.getPossibleTimeslots();

    res.send(timeslots);
});

router.get('/test', async (req, res) => {
    res.send(true);
});

router.post('/get-workers-for-school', async (req, res) => {
    // Validate appropriate parameters are passed to view workers at each school 
    const getWorkersForSchool = Joi.object({
        schoolId: Joi.number().integer().required(), //The student must specify their school ID in order to view the workers
    });

    const query = req.query ? req.query : {};

    const schoolId = query.schoolId ? query.schoolId : null;

    const { error } = getWorkersForSchool.validate({ schoolId });

    if (!_.isNil(error)) res.send(error);

    // Attempts to fetch all workers for a specific school 
    const workerIds = await schoolHandler.getWorkerIdsForSchool(schoolId);

    res.send(workerIds);
});

// Cancels all the appointments/meetings and updates worker availability to unavailable for a worker for a specific day.
// Note that appointments/meetings are synonymous, but only appointments will be used in the backend to maintain consistency.
router.get('/cancel-specific-day', async (req, res) => {
    const paramSchema = Joi.object({
        workerId: Joi.number().integer().required(),
        specificDate: Joi.date().iso().required(),
        
        // Following potential query parameters are commented out to be revisited in a future story. 
        // startTime: Joi.date().iso().required(),
        // endTime: Joi.date().iso().greater(Joi.ref('startTime')) // Checks to ensure that endDate > startDate is specified.
    })

    const query = req.query ? req.query : {};

    const workerId = query.workerId;
    const specificDate = query.specificDate;

    const { error } = paramSchema.validate({ workerId, specificDate });

    if (!_.isNil(error)) res.send(error);

    const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

    res.send(isCancelledSuccessfully);
});


module.exports = router