const _ = require('lodash');
const UIDGenerator = require('uid-generator');

const studentModel = require('../db/student');
const workerModel = require('../db/worker');

const UserTypes = require('../../constants/userTypes.json');

/* The goal: Take in the user input from the Account Creation form in 
the front end UI in order to create a user account in the backend*/
async function createUserAccount(firstName, lastName, type, studentId, email, password, phone, userType, workerId, specialization, schoolId) {
    // Generates an accessToken of length 20 characters.
    // Note: The accessToken includes all alphanumeric characters except for 0, O, I, and l — characters easily mistaken for each other)
    const uidgen = new UIDGenerator(UIDGenerator.BASE16);
    const token = await uidgen.generate();
    const accessToken = token.substring(0, 20);

    //try {
        if (userType == UserTypes.student) {
            const student = await studentModel.insertStudentAccount(firstName, lastName, studentId, email, password, phone, schoolId, accessToken);
            if (!_.isNil(student)) return student;
        } else if (userType == UserTypes.worker) {
            // Searches the worker table to see if a student account exists for the given data.
            const worker = await workerModel.insertWorkerAccount(firstName, lastName, type, workerId, email, password, phone, specialization, accessToken);
        if (!_.isNil(worker)) return worker;
        } else {
            // If the userType is neither a student nor a worker, then return null.
            return null;
        }
    //} //catch(err) {
       //console.log('Error occurred in createUserAccount method', err);
       //return null;
    
   //}
}//;

//export the createUserAccount
module.exports = {
    createUserAccount
} 