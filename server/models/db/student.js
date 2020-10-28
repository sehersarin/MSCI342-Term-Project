const userModel = require('../db/user');

const Student = require('../data/Student');

const Tables = require('../../constants/tables.json');

// This method returns the corresponding student given their email and password or null if the email and/or password is incorrect.
// This method is added on top of the getUser method as other tasks may need to get the student. Without this method, there would be duplication of code 
// since the same parameters will need to be passed in userModel for getting a student object.
async function getStudent(email, password) {
    return userModel.getUser(email, password, Tables.student, Student);
}
// This method inserts a student account given specific information.
async function insertStudentAccount(firstName, lastName, type, studentID, email, password, phone) {
    // Added conditional statements to prevent purpose, studentNotes, and workerComments from storing "null" instead of null.    
   //Data recieved from the front end sign up form

    return db.any(`insert into ${Tables.student} (firstName, lastName, type, studentID, email, password, phone) values 
    (${firstName}, ${lastName}, ${type}, ${studentID}, ${email}, ${password}, ${phone} );
}

module.exports = {
    getStudent,
}