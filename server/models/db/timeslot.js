const _ = require('lodash');

const { db } = require('../../lib/connection');
const Tables = require('../../constants/tables.json');
//const TimeslotStatus = require('../../constants/timeslot-status.json');

// This method returns the timeslot records stored in the timeslot table 
//Note the parameters, as this method, if given specific start time and specific end time to return  
async function getPossibleTimeslots(specificStartTime, specificEndTime) {
    if (_.isNil(specificStartTime) || _.isNil(specificEndTime)) {
        const timeslotDetails = await db.any(`select * from ${Tables.timeslot};`);
        return timeslotDetails;
    }
    else {
        const timeslotDetails = await db.any(`select * from ${Tables.timeslot} where start_time >='${specificStartTime}' and end_time <= '${specificEndTime}';`);
        if (_.isEmpty(timeslotDetails)) return null;
        return timeslotDetails;
    }
}

module.exports = {
    getPossibleTimeslots,
} 
