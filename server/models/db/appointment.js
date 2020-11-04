const _ = require('lodash');

const { db } = require('../../lib/connection');

const AppointmentDetails = require('../data/AppointmentDetails');

const Tables = require('../../constants/tables.json');
const AppointmentStatus = require('../../constants/appointmentStatus.json');

// This method inserts an appointment entry given specific information.
async function insertAppointment(studentId, workerTimeslotId, purpose, studentNotes, workerComments) {
    // Added conditional statements to prevent purpose, studentNotes, and workerComments from storing "null" instead of null.    
    // Assumes all new appointments are upcoming and not for the past (as front end only allows users to book appointments for future dates).
    return db.any(`insert into ${Tables.appointment} (student_id, worker_timeslot_id, purpose, student_notes, worker_comments, status) values (${studentId}, ${workerTimeslotId}, ${purpose ? `'${purpose}'` : null}, ${studentNotes ? `'${studentNotes}'` : null}, ${workerComments ? `'${workerComments}'` : null}, '${AppointmentStatus.upcoming}');`);
}

async function getAppointmentDetails(studentId, workerId, status) {
    var queryParams = `${Tables.appointment}.appointment_id, ${Tables.workerTimeslot}.date, ${Tables.timeslot}.start_time, ${Tables.timeslot}.end_time, ${Tables.appointment}.status`;
    var tableJoins = `${Tables.appointment} inner join ${Tables.workerTimeslot} on ${Tables.appointment}.worker_timeslot_id = ${Tables.workerTimeslot}.worker_timeslot_id natural join ${Tables.timeslot}`;
    var queryCond = `${Tables.appointment}.status='${status}'`

    // If the studentId was not passed in, then execute query to obtain all need appointment information for a worker.
    if (_.isNil(studentId)) {
        queryParams += `, ${Tables.student}.student_id, ${Tables.student}.first_name, ${Tables.student}.last_name`;
        tableJoins += ` inner join ${Tables.student} on ${Tables.appointment}.student_id = ${Tables.student}.student_id`;
        queryCond += ` and ${Tables.workerTimeslot}.worker_id=${workerId}`;
    } else {
        queryParams += `, ${Tables.worker}.worker_id, ${Tables.worker}.first_name, ${Tables.worker}.last_name`;
        tableJoins += ` inner join ${Tables.worker} on ${Tables.workerTimeslot}.worker_id = ${Tables.worker}.worker_id`;
        queryCond += ` and ${Tables.appointment}.student_id=${studentId}`;
    }

    const queryStmt = `select ${queryParams} from ${tableJoins} where ${queryCond};`;
    const appointments = await db.any(queryStmt);

    if (_.isEmpty(appointments)) return null;

    return _.map(appointments, appointment => new AppointmentDetails(appointment));
}

module.exports = {
    insertAppointment,
    getAppointmentDetails,
} 