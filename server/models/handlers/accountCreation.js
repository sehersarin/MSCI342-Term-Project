async function userAccount(firstName, lastName, type, studentID, email, password, phone) {
    const user = {
        type: 'student', //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
        accessToken: '2wA4s6t',
        studentId: 20764242,
        firstname: 'Victor',
        lastname: 'Hugo',
        email: 'victorhugo@gmail.com',
        phone: "6476442200",
    };

    return user;
};


module.exports = {
    userAccount,
    isAccessTokenValid,
} 