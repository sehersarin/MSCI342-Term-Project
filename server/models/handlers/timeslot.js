const timeslotModel = require('../db/Timeslot');

// Fetches timeslot records from the timeslot table 
async function getPossibleTimeslots(specificStartTime, specificEndTime) {

    return timeslotModel.getPossibleTimeslots(specificStartTime, specificEndTime);
}

module.exports = {
    getPossibleTimeslots,
}
