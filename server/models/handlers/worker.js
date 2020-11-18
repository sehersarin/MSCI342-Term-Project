const workerModel = require('../db/worker');

// Adds a timeslot into the database and returns true upon successful completion. 
async function getWorkersByWorkerIds( workerIds) {
    try {
        const workerObjects = await workerModel.getWorkersByWorkerIds(workerIds);
        return workerObjects;
    } catch(error) {
        console.log('Error occurred in getWorkersByWorkerIds method: ', error);
        return null;
    }
};

module.exports = {
    getWorkersByWorkerIds,
}