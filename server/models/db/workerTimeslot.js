const _ = require('lodash');

const { db } = require('../../lib/connection');

const Tables = require('../../constants/tables.json');
const WorkerTimeslot = require('../data/workerTimeslot');
const TimeslotStatus = require('../../constants/timeslotStatus.json');


// This method inserts an appointment entry given specific information.
async function insertWorkerTimeslot(slotId, schoolId, workerId, status, date) {
    // Added conditional statements to prevent status and date from storing "null" instead of null. 
    //var date_format = moment(date).format('YYYY MM DD');

    return db.any(`insert into ${Tables.workerTimeslot} (slot_id, school_id, worker_id, status, date) values (${slotId}, ${schoolId}, ${workerId}, ${status ? `'${status}'` : `'${TimeslotStatus.available}'`} , '${date}');`);
}


async function checkWorkerAvailability(workerTimeslotId) {
    if (_.isNil(workerTimeslotId)) return false;
    try {
        //query
        //Selects all from workerTimeslot table 
        const queryStatement = `select * from ${Tables.workerTimeslot}  where worker_timeslot_id = ${workerTimeslotId}`;
        const queryOutput = await db.any(queryStatement);
        //check if workertimeSlot is present 
        if (_.isEmpty(queryOutput)) return false;
        //check if available 
        const currentStatus = _.map(queryOutput, 'status');
        if (currentStatus == 'available') return true; 
        return false;

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }

    // This method mass updates all the worker's availability (that are currently in the system) on a specific date to a new status.
    // Entries will NOT be inserted to indicate that the worker is unavailable during all the timeslots of that day to minimize database storage
    // as it is assumed that the worker is unavailable if the information is not inputted. However, these rows are updated rather than deleted
    // for historical tracking and logging.

}
module.exports = {
    insertWorkerTimeslot,
    checkWorkerAvailability,
} 
