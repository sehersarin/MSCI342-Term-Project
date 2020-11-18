const timeslotModel = require('../db/timeslot');

// Fetches timeslot records from the timeslot table 
async function getPossibleTimeslots() {
    return timeslotModel.getPossibleTimeslots();
}

module.exports = {
    getPossibleTimeslots,
}
