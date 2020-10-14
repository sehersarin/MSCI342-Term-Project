const authenticateHandler = require('../models/handlers/authenticate');

describe('testing user validation functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('initial setup of user validation', async() => {
        // Arrange
        const email = 'johndoe@gmail.com';
        const password = 'a1234';
        const testUser = {
            type: 'student',
            accessToken: 'A12345',
            studentId: 1234,
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@gmail.com',
            phone: "5191234567",
            schoolId: 1
        };

        // Act
        const user = await authenticateHandler.getUserFromCredentials(email, password);

        // Assert
        expect(user).toMatchObject(testUser);
    });

    test('initial setup of access token verification', async() => {
        // Arrange
        const accessToken = 'A12345';

        // Act
        const isValid = await authenticateHandler.isAccessTokenValid(accessToken);

        // Assert
        expect(isValid).toBe(true);
    });

});