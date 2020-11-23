const workerModel = require('../db/worker');

// A second query to fetch worker details from the workerIds
async function getWorkersByWorkerIds(workerIds) {
    const workerObjects = await workerModel.getWorkersByWorkerIds(workerIds);
    return workerObjects;
};

module.exports = {
    getWorkersByWorkerIds,
}