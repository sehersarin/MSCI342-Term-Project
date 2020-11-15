const timeslotModel = require('../db/workerTimeslot');
async function getWorkerIdsForSchool(schoolId) {
      var workerIds = [8000000, 8000001, 8000002, 8000003];
      return workerIds;
};
module.exports = {
      getWorkerIdsForSchool,
}