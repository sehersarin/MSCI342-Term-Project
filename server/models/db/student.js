const userModel = require('../db/user');

const Student = require('../data/Student');

const Tables = require('../../constants/tables.json');

// This method returns the corresponding student given their email and password or null if the email and/or password is incorrect.
// This method is added on top of the getUser method as other tasks may need to get the student. Without this method, there would be duplication of code 
// since the same parameters will need to be passed in userModel for getting a student object.
async function getStudent(email, password) {
    return userModel.getUser(email, password, Tables.student, Student);
}

module.exports = {
    getStudent,
}