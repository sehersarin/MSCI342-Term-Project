// Gets the time availabilities for a specific worker for a specific school.
const _ = require('lodash');
const availabilityModel = require('../db/availability');
//need userTypes or Workerstatus?
const UserTypes = require('../../constants/userTypes.json');

//
async function getAvailabilityDetails(slot_id, school_id, worker_id, status, date)  {
   
    // Don't need this becuase the db will return an error if the worker credentials are invalid.Searches the worker table to see if it is valid worker credentials
   /*     const worker = await availabilityModel.getWorker(email, password);
    if  (!_.isNil(worker))
     return worker;*/

     return availabilityModel.getAvailabilityDetails(slot_id, school_id, worker_id, status, date) ;
    }

// Fetches all the essential availibility details and returns the workerId in case more information is desired.
 



/* Will delete these hardcoded values

const availableTimes = [
        {
            workerTimeslotId: 1,
            startTime: '08:00:00', 
            endTime: '08:30:00',
            date: '2020-10-20'
        },
        {
            workerTimeslotId: 2,
            startTime: '08:30:00', 
            endTime: '09:00:00',
            date: '2020-10-20'
        },
        {
            workerTimeslotId: 3,
            startTime: '09:00:00', 
            endTime: '09:30:00',
            date: '2020-10-20'
        }
    ];

    return availableTimes;
};
*/

module.exports = {
    getAvailabilityDetails,
}