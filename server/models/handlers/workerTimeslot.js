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

async function bookWorkerTimeslot(status){
    try {
        await timeslotModel.insertWorkerTimeslot(status);
        return true;
    } catch (error) {
        console.log('Error occurred in updatingTheWorkerAvailability method: ', error);
        return false;
    }
};

module.exports = {
    addWorkerTimeslot,
    updatingTheWorkerAvailability,
}