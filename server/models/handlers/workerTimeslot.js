const _ = require('lodash');
const timeslotModel = require('../db/workerTimeslot');

// Adds a timeslot into the database and returns true upon successful completion. 
async function addWorkerTimeslot( slotId, schoolId, workerId, status, date) {
    try {
        await timeslotModel.insertWorkerTimeslot(slotId, schoolId, workerId, status, date);
        return true;
    } catch(error) {
        console.log('Error occurred in addWorkerTimeslot method: ', error);
        return false;
    }
};

<<<<<<< HEAD
async function checkWorkerAvailability(workerTimeslotId) {
    return timeslotModel.checkWorkerAvailability(workerTimeslotId);
};

module.exports = {
    addWorkerTimeslot,
    checkWorkerAvailability,
}

=======
async function checkWorkerAvailability(slotId, workerId, status, date) {
    //do I need to check if worker credentials are valid?
    if (_.isNil(status)) {
        return null;
    }
    return checkWorkerAvailabilityModel.checkWorkerAvailability(slotId, workerId, status, date);
}


module.exports = {
    addWorkerTimeslot,
    checkWorkerAvailability
}
>>>>>>> parent of 2763ebf... Merge branch 'master' into S15-T1-Determine-if-worker-is-available-during-workerTimeslotId
