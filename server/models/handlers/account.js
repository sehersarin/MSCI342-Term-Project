/* The goal: Take in the user input from the Account Creation form in 
the front end UI in order to create a user account in the backend*/

async function createUserAccount(first_name, last_name, type, student_id, email, password, phone) {
     // Searches the student table to see if a student account exists for the given data.

     If userType = userType.student {
     const user = await studentModel.insertStudentAccount(first_name, last_name, type, student_id, email, password, phone);
     if  (!_.isNil(student)) return student;
     } else if userType = userType.worker {
     // Searches the worker table to see if a student account exists for the given data.
     const worker = await workerModel.insertWorkerAccount(first_name, last_name, type, worker_id, email, password, phone);
     if  (!_.isNil(worker)) return worker;
     }
 
     // Returns the user
     return user;
 };

 //code on lines 18-28 is not needed (hard-coded for the previous iteration). I will delete this once I know that the lines 5-15 run properly.
   /* const user = {
        type: 'student', //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
        studentId: '20764242',
        firstname: 'Victor',
        lastname: 'Hugo',
        email: 'victorhugo@gmail.com',
        phone: '6476442200'

         /*  Please note: When returning user object, 
        I have omitted the 'password'. 
        This is done intentionally for privacy reasons. */

    



//export the createUserAccount
module.exports = {
    createUserAccount
} 