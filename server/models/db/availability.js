const { db } = require('../../lib/connection');

const AvailabilityDetails = require('../data/AvailabilityDetails');

const Tables = require('../../constants/tables.json');
const AppointmentStatus = require('../../constants/appointmentStatus.json');


async function getAvailabilityDetails(studentId, workerId, status) {
    var queryParams = `${Tables.appointment}.appointment_id, ${Tables.workerTimeslot}.date, ${Tables.timeslot}.start_time, ${Tables.timeslot}.end_time, ${Tables.appointment}.status`;
    var tableJoins = `${Tables.appointment} inner join ${Tables.workerTimeslot} on ${Tables.appointment}.worker_timeslot_id = ${Tables.workerTimeslot}.worker_timeslot_id natural join ${Tables.timeslot}`;
    var queryCond = `${Tables.appointment}.status='${status}'`

    // Execute query to obtain all need appointment information for a worker.
    
        queryParams += `, ${Tables.worker}.worker_id, ${Tables.worker}.first_name, ${Tables.worker}.last_name`;
        tableJoins += ` inner join ${Tables.worker} on ${Tables.workerTimeslot}.worker_id = ${Tables.worker}.worker_id`;
        queryCond += ` and ${Tables.appointment}.student_id=${studentId}`;
    

    const queryStmt = `select ${queryParams} from ${tableJoins} where ${queryCond};`;
    const appointments = await db.any(queryStmt);

    if (_.isEmpty(appointments)) return null;

    return _.map(appointments, appointment => new AvailabilityDetails(appointment));
}

module.exports = {

    getAvailabilityDetails,
}  