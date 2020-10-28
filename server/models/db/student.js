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
    //Data recieved from the front end sign up form
 //Insert one row into a table
     return db.run(`insert into ${Tables.worker}(firstName, lastName, type, studentID, email, password, phone) values 
     (${firstName}, ${lastName}, ${type}, ${studentID}, ${email}, ${password}, ${phone})`,['C'], function(err){
         if (err) {
             return console.log(err.message);
           }
           //get the last insert id
           console.log(`A row has been inserted with rowid ${this.lastID}`);
     });
    }

module.exports = {
    getStudent,
    insertStudentAccount,
}