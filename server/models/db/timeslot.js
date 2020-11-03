const _ = require('lodash');

const { db } = require('../../lib/connection');
const Tables = require('../../constants/tables.json');

// This method inserts an appointment entry given specific information.
async function insertWorkerTimeslot(slotId, schoolId, workerId, status, date) {
    // Added conditional statements to prevent status and date from storing "null" instead of null. 
    // Date is currently being input as a string. Unsure of correct format for date data type. 
    // Opportunity to add the "recurring" functionality not taken yet. Unsure if this will come from the front end or not. 
    //const query_var = await insertWorkerTimeslot.one(`insert into ${Tables.worker_timeslot} (slot_id, school_id, worker_id, status, date) values (${slotId}, ${schoolId}, ${workerId}, '${TimeslotStatus.available}', '${date}')`);
    if (_.isNil(slotId) || _.isNil(schoolId)|| _.isNil(workerId)|| _.isNil(date)){
        return false;
    }
    else{
    return db.any(`insert into ${Tables.worker_timeslot} (slot_id, school_id, worker_id, status, date) values (${slotId}, ${schoolId}, ${workerId}, ${status ? `'${status}'` : null}, '${date}');`);
    }
}

module.exports = {
    insertWorkerTimeslot,
} 
