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

async function bookWorkerTimeslot(workerTimeslotId) {
    try {
        await timeslotModel.bookWorkerTimeslot(workerTimeslotId);
        return true;
    } catch (error) {
        console.log('Error occurred in bookWorkerTimeslot method: ', error);
        return false;
    }
};

module.exports = {
    addWorkerTimeslot,
    bookWorkerTimeslot,
}