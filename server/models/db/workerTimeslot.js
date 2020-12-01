const _ = require('lodash');

const { db } = require('../../lib/connection');

const Tables = require('../../constants/tables.json');

const TimeslotStatus = require('../../constants/timeslot-status.json');
const WorkerTimeslot = require('../data/workerTimeslot');

const TimeslotStatus  = require('../../constants/timeslotStatus.json');


// This method inserts an appointment entry given specific information.
async function insertWorkerTimeslot(slotId, schoolId, workerId, status, date) {
    // Added conditional statements to prevent status and date from storing "null" instead of null. 
    //var date_format = moment(date).format('YYYY MM DD');

    return db.any(`insert into ${Tables.workerTimeslot} (slot_id, school_id, worker_id, status, date) values (${slotId}, ${schoolId}, ${workerId}, ${status ? `'${status}'` : `'${TimeslotStatus.available}'`} , '${date}');`);
}


async function checkWorkerAvailability(workerTimeslotId) {

    try {
        //Selects the status of the given worker_id at the given slot_id
        //var queryStatement = `select ${status} from ${Tables.workerTimeslot}  where worker_id = ${workerId} and slot_id = ${slotId}`;
        var queryStatement = `select ${status} from ${Tables.workerTimeslot}  where worker_timeslot_id = ${workerTimeslotId}`; 
        //Only adds date if the user specified the date.
        //if (date) queryStatement += ` and date = ${date}`;

        const isAvailable = await db.any(queryStatement);
        //The queryStatement returns null if the status is empty
        if (_.isEmpty(isAvailable)) return null;
       //if status is 'available', return true
        else if (_.isEqual(available)) return true;
        else
        return _.map(isAvailable, workerTimeslot => new WorkerTimeslot(workerTimeslot));
//async function updateWorkerAvailability(workerId, specificDate, newStatus) {
return db.any(`update ${Tables.workerTimeslot} set status='${newStatus}' where date='${specificDate}' and worker_id='${workerId}';`);

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
   // updateWorkerAvailability,

} //}
