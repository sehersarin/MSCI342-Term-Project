const { db } = require('../../lib/connection');

const AvailabilityDetails = require('../data/AvailabilityDetails');

const Tables = require('../../constants/tables.json');
//slot_id, school_id, worker_id, status, date
async function getAvailabilityDetails(slot_id, school_id, worker_id, status, date) {
    var queryParams = `${Tables.Worker_Timeslot}.slot_id, ${Tables.workerTimeslot}.school_id, ${Tables.timeslot}.worker_id, ${Tables.timeslot}.date, ${Tables.Worker_Timeslot}.status`;
  //  var tableJoins = `${Tables.Worker_Timeslot} inner join ${Tables.workerTimeslot} on ${Tables.Worker_Timeslot}.worker_timeslot_id = ${Tables.workerTimeslot}.worker_timeslot_id natural join ${Tables.timeslot}`;
    var queryCond = `${Tables.Worker_Timeslot}.worker_id='${worker_id}'`

    // Execute query to obtain all need Worker_Timeslot information for a worker.
    
        queryParams += `, ${Tables.Worker_Timeslot}.slot_id, ${Tables.workerTimeslot}.school_id, ${Tables.timeslot}.worker_id, ${Tables.timeslot}.date, ${Tables.Worker_Timeslot}.status`;
        //tableJoins += ` inner join ${Tables.worker} on ${Tables.workerTimeslot}.worker_id = ${Tables.worker}.worker_id`;
        queryCond += ` and ${Tables.Worker_Timeslot}.worker_id='${worker_id}'`;
    

    const queryStatement = `select ${queryParams} from ${Tables.Worker_Timeslot} where ${queryCond};`;
    
    const availability = await db.any(queryStatement);

    if (_.isEmpty(availability)) return null;

    return _.map(availability => new AvailabilityDetails(Worker_Timeslot));
}

module.exports = {

    getAvailabilityDetails,
}  