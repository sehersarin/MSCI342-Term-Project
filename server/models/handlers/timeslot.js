const timeslotModel = require('../db/Timeslot');

// Fetches timeslot records from the timeslot table 
async function getPossibleTimeslots(startTime, endTime) {
    return timeslotModel.getPossibleTimeslots(startTime, endTime);
}

module.exports = {
    getPossibleTimeslots,
}
