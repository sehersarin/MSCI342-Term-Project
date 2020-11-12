const _ = require('lodash');

const { db } = require('../../lib/connection');
const Tables = require('../../constants/tables.json');
const TimeslotStatus = require('../../constants/timeslot-status.json');

// This method inserts an appointment entry given specific information.
async function insertWorkerTimeslot(slotId, schoolId, workerId, status, date) {
    // Added conditional statements to prevent status and date from storing "null" instead of null. 
    //var date_format = moment(date).format('YYYY MM DD');

    return db.any(`insert into ${Tables.workerTimeslot} (slot_id, school_id, worker_id, status, date) values (${slotId}, ${schoolId}, ${workerId}, ${status ? `'${status}'` : `'${TimeslotStatus.available}'`} , '${date}');`);
}

module.exports = {
    insertWorkerTimeslot
} 
