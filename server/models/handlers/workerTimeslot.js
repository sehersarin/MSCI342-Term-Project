const timeslotModel = require('../db/timeslot');

// Adds a timeslot into the database and returns true upon successful completion. 
async function addWorkerTimeslot( slotId, schoolId, workerId, date) {
    try {
        await timeslotModel.insertWorkerTimeslot(slotId, schoolId, workerId, date);
        return true;
    } catch(error) {
        console.log('Error occurred in addWorkerTimeslot method: ', error);
        return false;
    }
};

module.exports = {
    addWorkerTimeslot,
}