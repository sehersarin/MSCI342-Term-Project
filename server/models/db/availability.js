const { db } = require('../../lib/connection');

const AvailabilityDetails = require('../data/AvailabilityDetails');

const Tables = require('../../constants/tables.json');
const TimeslotStatus  = require('../../constants/timeslotStatus.json');

//Parameters returned are slot_id, school_id, worker_id, status, and date
async function getAvailabilityDetails(workerId, schoolId, startDate, endDate) {
    try {
        const queryStatement = `select * from ${Tables.workerTimeslot} natural join ${Tables.timeslot} where school_id = ${schoolId} and worker_id = ${workerId} and date >= '${startDate}' and date <= '${endDate}' and status = ${TimeslotStatus.available};`;

        const availability = await db.any(queryStatement);
        //The queryStatement returns null if the availability is empty
        if (_.isEmpty(availability)) return null;

        return AvailabilityDetails(availability);

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }
}

module.exports = {
    getAvailabilityDetails,
}  