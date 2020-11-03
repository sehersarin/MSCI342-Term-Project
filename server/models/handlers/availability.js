// Gets the time availabilities for a specific worker for a specific school.
const _ = require('lodash');
const workerModel = require('../db/worker');
const UserTypes = require('../../constants/userTypes.json');

async function getWorkerAvailability(workerId, schoolId, startTime, endTime) {
   
    // Searches the worker table to see if it is valid worker credentials
    const worker = await workerModel.getWorker(email, password);
    if  (!_.isNil(worker)) return worker;

    // Returns null if the credentials do not match a student nor a worker's credentials.
    return null;

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

module.exports = {
    getWorkerAvailability,
}