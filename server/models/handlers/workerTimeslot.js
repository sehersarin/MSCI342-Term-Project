const timeslotModel = require('../db/workerTimeslot');
const _ = require('lodash');

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
async function checkWorkerAvailability(workerTimeslotId) {
    if (_.isNil(workerTimeslotId)) return false;
    return timeslotModel.checkWorkerAvailability(workerTimeslotId);
};

module.exports = {
    addWorkerTimeslot,
    checkWorkerAvailability,
}