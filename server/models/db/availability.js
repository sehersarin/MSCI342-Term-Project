const { db } = require('../../lib/connection');

const getAvailabilityDetails = require('../data/AvailabilityDetails');

const Tables = require('../../constants/tables.json');

//Parameters returned are slot_id, school_id, worker_id, status, and date
async function getAvailabilityDetails(workerId, schoolId, startTime, endTime) {
    try {
       
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