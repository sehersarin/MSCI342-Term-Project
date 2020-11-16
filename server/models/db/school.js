const _ = require('lodash');

const { db } = require('../../lib/connection');

const UserTypes = require('../../constants/userTypes.json');
const Tables = require('../../constants/tables.json');

const WorkerDetails = require('../data/Worker');

// This method returns the corresponding workers given school ID. If the school ID is incorrect, it will return null. 
// If either the tableName or Object are null or undefined, an error will be thrown.
async function getWorkerIdsForSchool(schoolId, Object) {
    if (_.isNil(schoolId) ) return null;
    
    //Query to recieve worker IDs from Service Worker School Table 
    const workerIds = await db.any(`select worker_id from Service_Worker_School where school_id='${schoolId}';`);

    //Retrieve worker attributes such as name, phone number, etc 
    //const data = await db.any(`select worker_id from Service_Worker where school_id='${first_name}, ${last_name}, ${email}, ${phone}, ${specialization};`);

    if (_.isEmpty(data)) return null;

    return new Object(data[0]);
}

async function getWorkersUsingIds(workerId ) {
    var queryParams = `${Tables.appointment}.appointment_id, ${Tables.workerTimeslot}.date, ${Tables.timeslot}.start_time, ${Tables.timeslot}.end_time, ${Tables.appointment}.status`;
    var tableJoins = `${Tables.appointment} inner join ${Tables.workerTimeslot} on ${Tables.appointment}.worker_timeslot_id = ${Tables.workerTimeslot}.worker_timeslot_id natural join ${Tables.timeslot}`;
    var queryCond = `${Tables.appointment}.status='${status}'`

    // If the studentId was not passed in, then execute query to obtain all need appointment information for a worker.

        queryParams += `, ${Tables.worker}.worker_id, ${Tables.worker}.first_name, ${Tables.worker}.last_name`;
        tableJoins += ` inner join ${Tables.worker} on ${Tables.workerTimeslot}.worker_id = ${Tables.worker}.worker_id`;
        queryCond += ` and ${Tables.appointment}.student_id=${studentId}`;

    const queryStmt = `select ${queryParams} from ${tableJoins} where ${queryCond};`;
    const query_output = await db.any(queryStmt);

    if (_.isEmpty(query_output)) return null;

    return _.map(query_output, worker_object => new WorkerDetails(worker_object));
}


module.exports = {
    getWorkerIdsForSchool,
    getWorkersUsingIds
}