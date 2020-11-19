const _ = require('lodash');

const { db } = require('../../lib/connection');

const AvailabilityDetail = require('../data/AvailabilityDetail');

const Tables = require('../../constants/tables.json');
const TimeslotStatus = require('../../constants/timeslotStatus.json');

//The goal: This code fetches the availability details of a specific worker from the database.
//The query joins the workerTimeslot table and the timeslot table from our database, 
//and selects all the resulting attributes for the entries where worker_id = the specified workerId 
//and the status = available.

async function getAvailabilityDetails(workerId, schoolId, startDate, endDate) {
    try {
        var queryStatement = `select * from ${Tables.workerTimeslot} natural join ${Tables.timeslot} where worker_id = ${workerId}`;

        // The following parameters are not required for this endpoint, but they are optional:
        // schoolId, startTime and endTime. 
        //If these parameters are specified by the user, then the query further filters the results to show only
        // those entries which correspond the the specified schoolId, startTime and endTime
        if (schoolId) queryStatement += ` and school_id = ${schoolId}`;
        if (startDate) queryStatement += ` and date >= '${startDate}'`;
        if (endDate) queryStatement += ` and date <= '${endDate}'`;

        queryStatement += ` and status = '${TimeslotStatus.available}';`;

        const availabilities = await db.any(queryStatement);

        //The queryStatement returns null if the availability is empty
        if (_.isEmpty(availabilities)) return null;
        //Parameters returned are slot_id, school_id, worker_id, status, and date
        return _.map(availabilities, availability => new AvailabilityDetail(availability));

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }
}

module.exports = {
    getAvailabilityDetails,
}  