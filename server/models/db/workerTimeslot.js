const _ = require('lodash');

const { db } = require('../../lib/connection');
const Tables = require('../../constants/tables.json');
const TimeslotStatus = require('../../constants/timeslot-status.json');

// This method inserts an appointment entry given specific information.
async function insertWorkerTimeslot(slotId, schoolId, workerId, status, date) {
    // Added conditional statements to prevent status and date from storing "null" instead of null. 
    // Date is currently being input as a string. Unsure of correct format for date data type. 
    // Opportunity to add the "recurring" functionality not taken yet. Unsure if this will come from the front end or not. 
    //var date_format = moment(date).format('YYYY MM DD');
    //console.log(date_format); 

    return db.any(`insert into ${Tables.workerTimeslot} (slot_id, school_id, worker_id, status, date) values (${slotId}, ${schoolId}, ${workerId}, ${status ? `'${status}'` : `'${TimeslotStatus.available}'`} , '${date}');`);
}

async function checkWorkerAvailability(slotId, workerId, status, date) {

    try {
        //Selects the status of the given worker_id at the given slot_id
        var queryStatement = `select * from ${Tables.workerTimeslot}  where worker_id = ${workerId} and slot_id = ${slotId}`;

        //Only adds date if the user specified the date.
        if (date) queryStatement += ` and date = ${date}`;

        const isAvailable = await db.any(queryStatement);
        //The queryStatement returns null if the availability is empty
        if (_.isEmpty(isAvailable)) return null;
        else if (_.isEqual(available)) return true;
        //else return false;

        return _.map(isAvailable, availability => new AvailabilityDetail(availability));

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }
}



module.exports = {
    insertWorkerTimeslot,
    checkWorkerAvailability
} }
