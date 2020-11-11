const _ = require('lodash');

const { db } = require('../../lib/connection');
const Tables = require('../../constants/tables.json');
//const TimeslotStatus = require('../../constants/timeslot-status.json');

// This method returns the timeslot records stored in the timeslot table 
//Note the total absence of parameters, as this method simply returns all possible timeslots 
async function getPossibleTimeslots() {
    const timeslotDetails = await db.any(`select * from ${Tables.timeslot};`);
    if (_.isEmpty(timeslotDetails)) return null;
    return timeslotDetails;
}

module.exports = {
    getPossibleTimeslots,
} 
