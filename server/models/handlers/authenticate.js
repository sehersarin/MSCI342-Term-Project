// Returns a sample student user object to be used for display in the frontend or null if invalid credentials.
// The actual user object to be returned will contain all the respective student/worker fields with additional fields for type and accessToken.
// The password field will NOT be returned for security purposes.
async function getUserFromCredentials(email, password) {
    const user = {
        type: 'student',
        accessToken: 'A12345',
        studentId: 1234,
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        phone: "5191234567",
        schoolId: 1
    };

    return user;
};

// Verify the access token for each private request to improve security.
async function isAccessTokenValid(accessToken) {
    return true;
};

module.exports = {
    getUserFromCredentials,
    isAccessTokenValid,
}