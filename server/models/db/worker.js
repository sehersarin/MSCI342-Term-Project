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
async function insertWorkerAccount(firstName, lastName, type, workerID, email, password, phone) {
   //Data recieved from the front end sign up form

    return db.any(`insert into ${Tables.worker} (firstName, lastName, type, studentID, email, password, phone) values 
    (${firstName}, ${lastName}, ${type}, ${workerID}, ${email}, ${password}, ${phone});
}

module.exports = {
    getWorker,
}