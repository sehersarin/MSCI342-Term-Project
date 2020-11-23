const schoolModel = require('../db/school');

async function getWorkerIdsForSchool(schoolId) {
      return schoolModel.getWorkerIdsForSchool(schoolId);
};


module.exports = {
      getWorkerIdsForSchool,
}