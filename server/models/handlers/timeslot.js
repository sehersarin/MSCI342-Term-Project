const timeslotModel = require('../db/Timeslot');

// Fetches timeslot records from the timeslot table 
async function getPossibleTimeslots() {
    return timeslotModel.getPossibleTimeslots();
}

module.exports = {
    getPossibleTimeslots,
}
