const _ = require('lodash');

const { db } = require('../../lib/connection');

const Tables = require('../../constants/tables.json');
const TimeslotStatus  = require('../../constants/timeslot-status.json');

// This method inserts an appointment entry given specific information.
async function insertWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date) {
    // Added conditional statements to prevent status and date from storing "null" instead of null. 
    // Date is currently being input as a string. Unsure of correct format for date data type. 
    // Opportunity to add the "recurring" functionality not taken yet. Unsure if this will come from the front end or not. 
    return db.any(`insert into ${Tables.worker_timeslot} (worker_timeslot_id, slot_id, school_id, worker_id, status, date) values (${workerTimeslotId}, ${slotId}, ${schoolId}, ${workerId}, ${status ? `'${status}'` : null}, ${date ? `'${date}'` : null}, '${TimeslotStatus .available}');`);
}

module.exports = {
    insertWorkerTimeslot,
} 