const _ = require('lodash');

const { db } = require('../../lib/connection');
const Tables = require('../../constants/tables.json');

// This method returns the timeslot records stored in the timeslot table 
// The method will return all timeslots in the timeslot table  
async function getPossibleTimeslots() {

    const timeslotDetails = await db.any(`select * from ${Tables.timeslot} ;`);
    return timeslotDetails;
}

module.exports = {
    getPossibleTimeslots,
} 
