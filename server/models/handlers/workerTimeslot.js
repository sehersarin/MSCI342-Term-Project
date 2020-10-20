const appointmentModel = require('../db/appointment');

// Adds an appointment to the database and returns true upon successful completion.
async function addWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date) {
    try {
        await appointmentModel.insertWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date);
        return true;
    } catch(error) {
        console.log('Error occurred in addWorkerTimeslot method: ', error);
        return false;
    }
};

module.exports = {
    addWorkerTimeslot,
}