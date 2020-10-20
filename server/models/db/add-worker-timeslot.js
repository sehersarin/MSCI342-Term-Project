const _ = require('lodash');

const { db } = require('../../lib/connection');

const Tables = require('../../constants/tables.json');
const AddTimeslotStatus = require('../../constants/timeslot-status.json');

// This method inserts an appointment entry given specific information.
async function insertWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date) {
    // Added conditional statements to prevent purpose, studentNotes, and workerComments from storing "null" instead of null.    
    // Assumes all new appointments are upcoming and not for the past (as front end only allows users to book appointments for future dates).
    return db.any(`insert into ${Tables.worker_timeslot} (worker_timeslot_id, slot_id, school_id, worker_id, status, date) values (${workerTimeslotId}, ${slotId}, ${schoolId}, ${workerId}, ${status ? `'${status}'` : null}, ${date ? `'${date}'` : null}, '${AddTimeslotStatus.available}');`);
}

module.exports = {
    insertWorkerTimeslot,
} 