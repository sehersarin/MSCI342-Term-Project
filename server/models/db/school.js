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

        //up till here, this is relevant to getting the worker ids 

        //const query_string = workerIds_2.data.join();
        /*
        //Parse input JSON string 
        const object = JSON.parse(workerIds_2);
        //Join elements of data array in object to a comma separated string
        const query_string = object.data.join();
        
        query_string = '';
        for (x in workerIds_2){
            query_string += workerIds_2;
        } 
        */


        // this part is relevant to getting the worker objects from the ids 
        const queryStmt = `select ${queryParams} from ${tableJoins} where worker_id in (${query_string});`;
        const query_output = await db.any(queryStmt);

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