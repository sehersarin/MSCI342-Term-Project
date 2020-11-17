const _ = require('lodash');

const studentModel = require('../db/student');
const workerModel = require('../db/worker');
const userModel = require('../db/user');

const UserTypes = require('../../constants/userTypes.json');

// The actual user object to be returned will contain all the respective student/worker fields with additional fields denoting user type and access token.
// Separated the student and worker table as business logic forbides overlap between the two (disjoint) and leveraged attribute inheritance to determine table attributes.
// Creation of user table would be redundant as all users captured in either student or worker table and would unnecessarily increase database storage space. 
async function getUserFromCredentials(email, password) {
    // Searches the student table to see if it is valid student credentials.
    const student = await studentModel.getStudent(email, password);
    if  (!_.isNil(student)) return student;

    // Searches the worker table to see if it is valid worker credentials
    const worker = await workerModel.getWorker(email, password);
    if  (!_.isNil(worker)) return worker;

    // Returns null if the credentials do not match a student nor a worker's credentials.
    return null;
};

// Verify the access token for each private request to improve security.
// Returns false if the access token does not match a student nor a worker's token.
async function isAccessTokenValid(accessToken) {
    // Searches the student table to see if the access token is valid for any student.
    let isValidAccessToken = await userModel.isValidUserAccessToken(accessToken, UserTypes.student);

    // If invalid student access token, then searches the worker table to see if the access token is valid for any worker.
    if (!isValidAccessToken) isValidAccessToken = await userModel.isValidUserAccessToken(accessToken, UserTypes.worker);

    return isValidAccessToken;
};

module.exports = {
    getUserFromCredentials,
    isAccessTokenValid,
}