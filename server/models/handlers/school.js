// Create stub which returns an array of Worker ID's given an input of school ID or school Name
async function getWorkerIdsForSchool(schoolID) {

      var workerIds = [8000000, 8000001, 8000002, 8000003]
      return workerIds;
};

module.exports = {
      getWorkerIdsForSchool,
}