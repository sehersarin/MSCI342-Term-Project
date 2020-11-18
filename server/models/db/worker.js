const { db } = require('../../lib/connection');

const userModel = require('../db/user');

const Worker = require('../data/Worker');

const Tables = require('../../constants/tables.json');

// This method returns the corresponding worker given their email and password or null if the email and/or password is incorrect.
// This method is added on top of the getUser method as other tasks may need to get the worker. Without this method, there would be duplication of code 
// since the same parameters will need to be passed in userModel for getting a worker object.
async function getWorker(email, password) {
    return userModel.getUser(email, password, Tables.worker, Worker);
}

// This method inserts a worker account given specific information.
async function insertWorkerAccount(firstName, lastName, type, workerId, email, password, phone, specialization, accessToken) {
    // Insert one row into the worker table and obtains all values inserted using RETURNING keyword.
    const workerData = await db.any(`insert into ${Tables.worker}(first_name, last_name, type, worker_id, email, password, phone, specialization, access_token) values 
    ('${firstName}', '${lastName}', '${type}', ${workerId}, '${email}', '${password}', '${phone}', '${specialization}', '${accessToken}') RETURNING *`);

    return new Worker(workerData[0]);
}

//This method returns the first name, last name and other information about the worker 
async function getWorkersByWorkerIds(workerIds) {
    const queryStmt = `select * from service_worker where worker_id in (${workerIds});`;
    const query_output = await db.any(queryStmt);

    if (_.isEmpty(query_output)) return null;

    return _.map(query_output, worker_object => new WorkerDetails(worker_object));
}

module.exports = {
    getWorker,
    insertWorkerAccount,
    getWorkersByWorkerIds
}
