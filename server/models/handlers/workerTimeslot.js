const _ = require('lodash');
const checkWorkerAvailabilityModel = require('../db/availability');

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


async function checkWorkerAvailability(workerTimeslotId) {
    //do I need to check if worker credentials are valid?
    if (_.isNil(status)) {
        return null;
    }
    return checkWorkerAvailabilityModel.checkWorkerAvailability(workerTimeslotId);
}


module.exports = {
    addWorkerTimeslot,
    checkWorkerAvailability
}

module.exports = {
    addWorkerTimeslot
}

