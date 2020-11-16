const WorkerObjectModel = require('../db/school');

async function getWorkerIdsForSchool(schoolId) {
      return WorkerObjectModel.getWorkerIdsForSchool(schoolId);
};


module.exports = {
      getWorkerIdsForSchool,
}