const _ = require('lodash');

const { db } = require('../../lib/connection');
const Tables = require('../../constants/tables.json');
//const TimeslotStatus = require('../../constants/timeslot-status.json');

// This method returns the timeslot records stored in the timeslot table 
//Note the parameters, as this method, if given specific start time and specific end time to return, wil only return timeslots within the start and end time parameters 
//If one or both ofthe parameters is null or not vlaid, the method will return all timeslots in the timeslot table  
async function getPossibleTimeslots(startTime, endTime) {
    var queryCondition = ''; 
    //baed on if statement logic, set query condition to be 
        //where start_time >='${startTime}'
        //where end_time <= '${endTime}'
        //where start_time >='${startTime}' and end_time <= '${endTime}'
    if (_.isNil(startTime) && _.isNil(endTime)) {
        queryCondition = ''; 
    }
    else if (_.isNil(startTime) /*&& !_.isNil(endTime)*/){
        //where end_time <= '${endTime}'
        queryCondition = ` where end_time <= '${endTime}';`; 
    }
    else if (/*!_.isNil(startTime) && */_.isNil(endTime)){
        //where start_time >='${startTime}'
        queryCondition = ` where start_time >='${startTime}';`; 
    }
    else /*if (!_.isNil(startTime) && !_.isNil(endTime))*/{
        //where start_time >='${startTime}' and end_time <= '${endTime}'
        queryCondition = ` where start_time >='${startTime}' and end_time <='${endTime}';`; 
    }
    const data = await db.any(`select * from ${Tables.timeslot}` + queryCondition);  
    //if (_.isEmpty(data)) return null;
    return data; 
    /*
    if (_.isNil(startTime) || _.isNil(endTime)) {
        const timeslotDetails = await db.any(`select * from ${Tables.timeslot};`);
        return timeslotDetails;
    }
    else {
        const timeslotDetails = await db.any(`select * from ${Tables.timeslot} where start_time >='${startTime}' and end_time <= '${endTime}';`);
        if (_.isEmpty(timeslotDetails)) return null;
        return timeslotDetails;
    }
    */
}

module.exports = {
    getPossibleTimeslots,
} 
