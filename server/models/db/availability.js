const { db } = require('../../lib/connection');

//const getAvailabilityDetails = require('../data/AvailabilityDetails');

const Tables = require('../../constants/tables.json');

//Parameters returned are slot_id, school_id, worker_id, status, and date
async function getAvailabilityDetails(workerId, schoolId, startTime, endTime) {
    try {
        //var queryParams = `${Tables.Worker_Timeslot}.slot_id, ${Tables.workerTimeslot}.school_id, ${Tables.timeslot}.worker_id, ${Tables.timeslot}.date, ${Tables.Worker_Timeslot}.status`;
        //var queryCond = `${Tables.Worker_Timeslot}.worker_id='${worker_id} and ${Tables.Worker_Timeslot}.school_id='${school_id} and ${Tables.Worker_Timeslot}.worker_id='${worker_id}'`

        // Execute query to obtain all need Worker_Timeslot information for a worker.

        //queryParams += `, ${Tables.Worker_Timeslot}.slot_id, ${Tables.workerTimeslot}.school_id, ${Tables.timeslot}.worker_id, ${Tables.timeslot}.date, ${Tables.Worker_Timeslot}.status`;
        //queryCond += ` and ${Tables.Worker_Timeslot}.worker_id='${worker_id}'`;

        //The queryStatement selects the parameters: slot_id, school_id, worker_id, status, and date
        // from the Worker_Timeslot table
        //where worker_id = the given worker_id

        const queryStatement = `select * from worker_timeslot natural join timeslot where school_id = ${schoolId} and worker_id = ${workerId} and start_time = '${startTime}' and end_time = '${endTime}' and status = ${'available'};`;

        const availability = await db.any(queryStatement);
        //The queryStatement returns null if the availability is empty
        if (_.isEmpty(availability)) return null;

        return availability;

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }
}

module.exports = {
    getAvailabilityDetails,
}  