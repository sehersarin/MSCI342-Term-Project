const _ = require('lodash');

const { db } = require('../../lib/connection');
const Tables = require('../../constants/tables.json');

const timeslotObject = require('../data/Timeslot');

// This method returns the timeslot records stored in the timeslot table 
// The method will return all timeslots in the timeslot table  
async function getPossibleTimeslots() {
    const timeslotDetails = await db.any(`select * from ${Tables.timeslot} ;`);
    return _.map(timeslotDetails, timeslot => new timeslotObject(timeslot));;
}

module.exports = {
    getPossibleTimeslots,
} 
