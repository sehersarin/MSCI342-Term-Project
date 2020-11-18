const _ = require('lodash');

const { db } = require('../../lib/connection');

const AvailabilityDetail = require('../data/AvailabilityDetail');

const Tables = require('../../constants/tables.json');
const TimeslotStatus = require('../../constants/timeslotStatus.json');

//Parameters returned are slot_id, school_id, worker_id, status, and date
async function getAvailabilityDetails(workerId, schoolId, startDate, endDate) {
    try {
        var queryStatement = `select * from ${Tables.workerTimeslot} natural join ${Tables.timeslot} where worker_id = ${workerId}`;

        //Only adds conditions if the user specified the conditions.
        if (schoolId) queryStatement += ` and school_id = ${schoolId}`;
        if (startDate) queryStatement += ` and date >= '${startDate}'`;
        if (endDate) queryStatement += ` and date <= '${endDate}'`;

        queryStatement += ` and status = '${TimeslotStatus.available}';`;

        const availabilities = await db.any(queryStatement);
        //The queryStatement returns null if the availability is empty
        if (_.isEmpty(availabilities)) return null;

        return _.map(availabilities, availability => new AvailabilityDetail(availability));

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }
}

module.exports = {
    getAvailabilityDetails,
}  