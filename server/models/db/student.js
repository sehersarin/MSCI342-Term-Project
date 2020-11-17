const { db } = require('../../lib/connection');

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
async function insertStudentAccount(firstName, lastName, studentId, email, password, phone, schoolId, accessToken) {
    // Insert one row into the student table and obtains all values inserted using RETURNING keyword.
    const studentData = await db.any(`insert into ${Tables.student}(first_name, last_name, student_id, email, password, phone, school_id, access_token) values 
     ('${firstName}', '${lastName}', ${studentId}, '${email}', '${password}', '${phone}', '${schoolId}', '${accessToken}') RETURNING *`);

    return new Student(studentData[0]);
}

module.exports = {
    getStudent,
    insertStudentAccount,
}