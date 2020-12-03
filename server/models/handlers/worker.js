const school = require('../db/school');
const workerModel = require('../db/worker');

// A second query to fetch worker details from the workerIds
async function getWorkersByWorkerIds(workerIds) {
    const workerObjects = await workerModel.getWorkersByWorkerIds(workerIds);
    return workerObjects;
};

// A query to fetch schools details from the workerIds
async function getSchools(workerId) {
    const schools = await school.getSchoolsByWorkerId(workerId);
    return schools;
};


module.exports = {
    getWorkersByWorkerIds,
    getSchools,
}