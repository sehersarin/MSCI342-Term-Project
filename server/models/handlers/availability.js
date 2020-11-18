const _ = require('lodash');
const availabilityModel = require('../db/availability');

// Gets the time availabilities for a specific worker for a specific school.
async function getAvailabilityDetails(workerId, schoolId, startTime, endTime) {
    // Worker credentials do not need to be checked as the getAvailabilityDetails method will return an error if the worker credentials are invalid.
    if (_.isNil(workerId) || _.isNil(schoolId)) {
        return null;
    }

    return availabilityModel.getAvailabilityDetails(workerId, schoolId, startTime, endTime);
}




module.exports = {
    getAvailabilityDetails,
}