// Create stub which returns an array of Worker ID's given an input of school ID or school Name
<<<<<<< Updated upstream
async function getWorkerIdsForSchool(schoolID) {
    
    var array_of_workerIds = false;
          //* insert (schoolID or schoolName)
      array_of_workerIds = true;
          var workerIds=[8000000,8000001,8000002,8000003]
    return array_of_workerIds;
=======
async function inputSchool(schoolID) {
    
    return false;
          //* insert (schoolID)
    return true;
          var workerIds=[8000000,8000001,8000002,8000003]
>>>>>>> Stashed changes
  };
  
  module.exports = {
      getWorkerIdsForSchool,
  }