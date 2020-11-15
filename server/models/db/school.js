const _ = require('lodash');

const { db } = require('../../lib/connection');

const UserTypes = require('../../constants/userTypes.json');
const Tables = require('../../constants/tables.json');

// This method returns the corresponding workers given school ID. If the school ID is incorrect, it will return null. 
// If either the tableName or Object are null or undefined, an error will be thrown.
async function getWorkerIdsForSchool(schoolId, Object) {
    if (_.isNil(schoolId) ) return null;
    
    //Query to recieve worker IDs from Service Worker School Table 
    const data = await db.any(`select worker_id from Service_Worker_School where school_id='${schoolId}';`);

    //Retrieve worker attributes such as name, phone number, etc 
    const data = await db.any(`select worker_id from Service_Worker';`);

    if (_.isEmpty(data)) return null;

    return new Object(data[0]);
}

module.exports = {
    getWorkerIdsForSchool,
}