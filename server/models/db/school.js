const _ = require('lodash');

const { db } = require('../../lib/connection');

const UserTypes = require('../../constants/userTypes.json');
const Tables = require('../../constants/tables.json');

const WorkerDetails = require('../data/Worker');

// This method returns the corresponding workers given school ID. If the school ID is incorrect, it will return null. 
async function getWorkerIdsForSchool(schoolId) {
    if (_.isNil(schoolId)) return null;
    try {
        //Query to recieve worker IDs from Service Worker School Table 
        const workerIds = await db.any(`select worker_id from ${Tables.workerSchool} where school_id='${schoolId}';`);

        if (_.isEmpty(workerIds)) return null;
        return _.map(workerIds, 'worker_id');

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }
}

// This method returns the corresponding schools given worker ID. If the worker ID is incorrect, it will return null. 
async function getSchoolsByWorkerId(workerId) {
    try {
        //Query to receive school id from Service Worker School Table
        const schoolIds = await db.any(`select school_id from ${Tables.workerSchool} where worker_id='${workerId}';`);
        
        if (_.isEmpty(schoolIds)) return null;
        return _.map(schoolIds, 'school_id');

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }
}

module.exports = {
    getWorkerIdsForSchool,
    getSchoolsByWorkerId,
}