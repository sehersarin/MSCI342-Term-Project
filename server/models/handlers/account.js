/* The goal: Take in the user input from the Account Creation form in 
the front end UI in order to create a user account in the backend*/

async function createUserAccount(firstName, lastName, type, studentId, email, password, phone, userType, workerId, specialization, schoolId ) {
    // Searches the student table to see if a student account exists for the given data.
    var user;
    if (userType == userType.student) {
        //Generates an accessToken of length 20 characters.
        // Note: The accessToken includes all alphanumeric characters except for 0, O, I, and l — characters easily mistaken for each other)
        const accessToken = new UIDGenerator(UIDGenerator.BASE16,20);

        user = await studentModel.insertStudentAccount(firstName, lastName, type, studentId, email, password, phone, schoolId, accessToken);
        if (!_.isNil(user)) return user;
    } else if (userType == userType.worker) {
        // Searches the worker table to see if a student account exists for the given data.
        user = await workerModel.insertWorkerAccount(firstName, lastName, type, workerId, email, password, phone, specialization, accessToken);
        if (!_.isNil(user)) return user;
    }

    // Returns the user
    return null;
};

//export the createUserAccount
module.exports = {
    createUserAccount
} 