const _ = require('lodash');

const { db } = require('../../lib/connection');

const Tables = require('../../constants/tables.json');
const AddTimeslotStatus = require('../../constants/timeslot-status.json');

// This method inserts an appointment entry given specific information.
async function insertAvailability(studentId, workerTimeslotId, purpose, studentNotes, workerComments) {
    // Added conditional statements to prevent purpose, studentNotes, and workerComments from storing "null" instead of null.    
    // Assumes all new appointments are upcoming and not for the past (as front end only allows users to book appointments for future dates).
    return db.any(`insert into ${Tables.appointment} (student_id, worker_timeslot_id, purpose, student_notes, worker_comments, status) values (${studentId}, ${workerTimeslotId}, ${purpose ? `'${purpose}'` : null}, ${studentNotes ? `'${studentNotes}'` : null}, ${workerComments ? `'${workerComments}'` : null}, '${AppointmentStatus.upcoming}');`);
}

module.exports = {
    insertAppointment,
} 