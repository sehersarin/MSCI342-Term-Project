/* The goal: Take in the user input from the Account Creation form in 
the front end UI in order to create a user account in the backend*/

async function userAccount(firstName, lastName, type, studentID, email, password, phone) {
    
    const user = {
        type: 'student', //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
        accessToken: '2wA4s6t',
        studentId: 20764242,
        firstname: 'Victor',
        lastname: 'Hugo',
        email: 'victorhugo@gmail.com',
        phone: "6476442200",

         /*  Please note: When returning user object, 
        I have omitted the 'password'. 
        This is done intentionally for privacy reasons. */
    };

    return user;
};

//export the userAccount
module.exports = {
    userAccount,
    isAccessTokenValid,
} 