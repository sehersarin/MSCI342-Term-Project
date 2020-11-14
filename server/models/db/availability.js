const { db } = require('../../lib/connection');

const AvailabilityDetails = require('../data/AvailabilityDetails');

const Tables = require('../../constants/tables.json');
//Parameters returned are slot_id, school_id, worker_id, status, and date
async function getAvailabilityDetails(slot_id, school_id, worker_id, status, date) {
    var queryParams = `${Tables.Worker_Timeslot}.slot_id, ${Tables.workerTimeslot}.school_id, ${Tables.timeslot}.worker_id, ${Tables.timeslot}.date, ${Tables.Worker_Timeslot}.status`;
    var queryCond = `${Tables.Worker_Timeslot}.worker_id='${worker_id}'`

    // Execute query to obtain all need Worker_Timeslot information for a worker.
    
       queryParams += `, ${Tables.Worker_Timeslot}.slot_id, ${Tables.workerTimeslot}.school_id, ${Tables.timeslot}.worker_id, ${Tables.timeslot}.date, ${Tables.Worker_Timeslot}.status`;
        queryCond += ` and ${Tables.Worker_Timeslot}.worker_id='${worker_id}'`;
    
//The queryStatement selects the parameters: slot_id, school_id, worker_id, status, and date
// from the Worker_Timeslot table
//where worker_id = the given worker_id

    const queryStatement = `select ${queryParams} from ${Tables.Worker_Timeslot} where ${queryCond};`;
    
    const availability = await db.any(queryStatement);

    //The queryStatement returns null if the availability is empty
    if (_.isEmpty(availability)) return null;

    return _.map(availability);
}

module.exports = {

    getAvailabilityDetails,
}  