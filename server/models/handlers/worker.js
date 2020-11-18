const workerModel = require('../db/worker');

// Adds a timeslot into the database and returns true upon successful completion. 
async function getWorkersByWorkerIds(workerIds) {
    const workerObjects = await workerModel.getWorkersByWorkerIds(workerIds);
    return workerObjects;
};

module.exports = {
    getWorkersByWorkerIds,
}