const authenticateHandler = require('../../models/handlers/authenticate');

describe('testing invalid user validation', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('rejection of null values for email and password', async () => {
        // Arrange
        const testEmail = null;
        const testPassword = null;

        // Act
        const user = await authenticateHandler.getUserFromCredentials(testEmail, testPassword);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of empty values for email and password', async () => {
        // Arrange
        const testEmail = '';
        const testPassword = '';

        // Act
        const user = await authenticateHandler.getUserFromCredentials(testEmail, testPassword);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of invalid email and password', async () => {
        // Arrange
        const testEmail = 'invalidEmail';
        const testPassword = 'invalidPassword';

        // Act
        const user = await authenticateHandler.getUserFromCredentials(testEmail, testPassword);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of invalid email', async () => {
        // Arrange
        const testEmail = 'invalidEmail';
        const testPassword = 'a1234';

        // Act
        const user = await authenticateHandler.getUserFromCredentials(testEmail, testPassword);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of invalid password', async () => {
        // Arrange
        const testEmail = 'johndoe@gmail.com';
        const testPassword = 'invalidPassword';

        // Act
        const user = await authenticateHandler.getUserFromCredentials(testEmail, testPassword);

        // Assert
        expect(user).toBe(null);
    });
});

describe('testing valid user validation', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('acceptance of valid student user', async () => {
        // Arrange
        const studentEmail = 'johndoe@gmail.com';
        const studentPassword = 'a1234';
        const studentUser = {
            studentId: 12345678,
            firstName: 'John',
            lastName: 'Doe',
            email: studentEmail,
            type: 'student',
            accessToken: 'XcCa92ZvOnQKZsGtOKOa',
            phone: null,
            schoolId: 1
        };

        // Act
        const user = await authenticateHandler.getUserFromCredentials(studentEmail, studentPassword);

        // Assert
        expect(user).toMatchObject(studentUser);
    });

    test('acceptance of valid worker user', async () => {
        // Arrange
        const workerEmail = 'joshuabrooks@gmail.com';
        const workerPassword = 'j1234';
        const workerUser = {
            workerId: 8000000,
            firstName: 'Joshua',
            lastName: 'Brooks',
            email: workerEmail,
            type: 'worker',
            accessToken: 'eeJAQr3wEC6CJZROFJTY',
            phone: '+15191234567',
            specialization: 'Masters in Social Work',
            type: 'Guidance Counselor'
        };

        // Act
        const user = await authenticateHandler.getUserFromCredentials(workerEmail, workerPassword);

        // Assert
        expect(user).toMatchObject(workerUser);
    });
});

describe('testing initial user validation setup', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('initial setup of access token verification', async () => {
        // Arrange
        const accessToken = 'A12345';

        // Act
        const isValid = await authenticateHandler.isAccessTokenValid(accessToken);

        // Assert
        expect(isValid).toBe(true);
    });

});