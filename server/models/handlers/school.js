// Create stub which returns an array of Worker ID's given an input of school ID or school Name
async function getWorkerIdsForSchool(schoolId) {
      const sampleWorkers = [
            {
                  workerId: 8000000,
                  firstName: "Joshua",
                  lastName: "Brooks",
                  email: "joshuabrooks@gmail.com",
                  userType: "worker",
                  accessToken: "eeJAQr3wEC6CJZROFJTY",
                  phone: "+15191234567",
                  specialization: "Masters in Social Work",
                  type: "Guidance Counselor"
              },
              {
                  workerId: 8000001,
                  firstName: "Carlos",
                  lastName: "Smiths",
                  email: "carlossmiths@gmail.com",
                  userType: "worker",
                  accessToken: "zV1Qnsx5VZKepGEFPAA3",
                  phone: null,
                  specialization: "Masters in Social Work",
                  type: "Guidance Counselor"
              },
              {
                  workerId: 8000002,
                  firstName: "Tyler",
                  lastName: "Evans",
                  email: "tylerevans@gmail.com",
                  userType: "worker",
                  accessToken: "f1vkT2o7monUUzvPREHP",
                  phone: null,
                  specialization: "Masters in Social Work",
                  type: "Social Worker"
              },
              {
                  workerId: 8000003,
                  firstName: "Kate",
                  lastName: "Loven",
                  email: "kateloven@gmail.com",
                  userType: "worker",
                  accessToken: "2OkQNaWyEZTU1JaEuBjh",
                  phone: null,
                  specialization: "Masters in Social Work",
                  type: "Social Worker"
              }
  
        ];
    
        return sampleWorkers;
    };
module.exports = {
      getWorkerIdsForSchool,
}