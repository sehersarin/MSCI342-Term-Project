// Gets the time availabilities for a specific worker for a specific school.
const _ = require('lodash');
const availabilityHandler = require('../db/availability');
//need userTypes or Workerstatus?
const UserTypes = require('../../constants/userTypes.json');

//
async function getAvailabilityDetails(workerId, schoolId, startTime, endTime)  {
   
    // Don't need this becuase the db will return an error if the worker credentials are invalid.Searches the worker table to see if it is valid worker credentials
    //const worker = await availabilityModel.getWorker(email, password);
    if  (_.isNil(workerId)||_.isNil(schoolId)) {
    return null;
    }

     return availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime) ;
    }

// Fetches all the essential availibility details and returns the workerId in case more information is desired.


module.exports = {
    getAvailabilityDetails,
}