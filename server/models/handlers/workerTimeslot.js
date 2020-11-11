const timeslotModel = require('../db/workerTimeslot');

// Adds a timeslot into the database and returns true upon successful completion. 
async function addWorkerTimeslot(slotId, schoolId, workerId, status, date) {
    try {
        await timeslotModel.insertWorkerTimeslot(slotId, schoolId, workerId, status, date);
        return true;
    } catch (error) {
        console.log('Error occurred in addWorkerTimeslot method: ', error);
        return false;
    }
};
// Fetches timeslot records from the timeslot table 
async function getPossibleTimeslots() {

    return timeslotModel.getPossibleTimeslots();
}


module.exports = {
    addWorkerTimeslot,
    getPossibleTimeslots,
}
