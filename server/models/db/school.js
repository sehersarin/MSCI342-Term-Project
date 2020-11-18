const _ = require('lodash');

const { db } = require('../../lib/connection');

const UserTypes = require('../../constants/userTypes.json');
const Tables = require('../../constants/tables.json');

const WorkerDetails = require('../data/Worker');

// This method returns the corresponding workers given school ID. If the school ID is incorrect, it will return null. 
// If either the tableName or Object are null or undefined, an error will be thrown.
async function getWorkerIdsForSchool(schoolId) {
    if (_.isNil(schoolId)) return null;
    try {
        //Query to recieve worker IDs from Service Worker School Table 
        const workerIds = await db.any(`select worker_id from Service_Worker_School where school_id='${schoolId}';`);
        //return workerIds;

        var queryParams = `${Tables.worker}.worker_id, ${Tables.worker}.first_name, ${Tables.worker}.last_name`;
        var tableJoins = ` ${Tables.worker} `;
        //queryCond += ` and ${Tables.appointment}.student_id=${studentId}`;
        //workerIds = 8000000;
        const workerIds_2 = JSON.stringify(workerIds);

        if (_.isEmpty(query_output)) return null;
        return _.map(query_output, worker_object => new WorkerDetails(worker_object));

    } catch (err) {
        console.log('Error occurred in ', err);
        return null;
    }
}


module.exports = {
    getWorkerIdsForSchool,
}