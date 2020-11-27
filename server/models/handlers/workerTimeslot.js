const timeslotModel = require('../db/workerTimeslot');

// Adds a timeslot into the database and returns true upon successful completion. 
//Due to database structure, there will never be a worker timeslot id input into this method that is non-existent and therefore testing cases are complete at this point 
async function addWorkerTimeslot(slotId, schoolId, workerId, status, date) {
    try {
        await timeslotModel.insertWorkerTimeslot(slotId, schoolId, workerId, status, date);
        return true;
    } catch (error) {
        console.log('Error occurred in addWorkerTimeslot method: ', error);
        return false;
    }
};


module.exports = {
    addWorkerTimeslot, 
    updateIndividualWorkerAvailability,
}
