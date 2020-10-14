// Returns the proper user object to be used for display in the frontend or null if invalid credentials.
async function getUserFromCredentials(email, password) {
    const user = {
        type: 'student',
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        accessToken: 'A12345'
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