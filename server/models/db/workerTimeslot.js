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

// This method returns the corresponding user given the email and password. If the email and/or password are incorrect or undefined, it will return null. 
// If either the tableName or Object are null or undefined, an error will be thrown.
// Default values for the parameters not assigned as either student or worker user types are equally likely (prevent issues).
async function getPossibleTimeslots() {
    //if (_.isNil(email) || _.isNil(password)) return null;
    //if (_.isNil(tableName) || _.isNil(Object)) throw new Error('InvalidParametersError', 'Invalid parameters. Make sure to specify tablename and Object arguments when calling the getUser method.');

    const timeslotDetails = await db.any(`select * from ${Tables.timeslot};`);

    if (_.isEmpty(timeslotDetails)) return null;

    return timeslotDetails;
}

module.exports = {
    insertWorkerTimeslot,
    getPossibleTimeslots,
} 
