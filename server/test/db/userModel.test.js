const userModel = require('../../models/db/user');
const Student = require('../../models/data/Student');
const Worker = require('../../models/data/Worker');

describe('testing invalid parameters for getUser method', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('null value for email and valid values for remaining parameters', async () => {
        // Arrange
        const testEmail = null;
        const testPassword = 'a1234';
        const tableName = 'student';
        const Object = Student;

        // Act
        const user = await userModel.getUser(testEmail, testPassword, tableName, Object);

        // Assert
        expect(user).toBe(null);
    });

    test('null value for password and valid values for remaining parameters', async () => {
        // Arrange
        const testEmail = 'johndoe@gmail.com';
        const testPassword = null;
        const tableName = 'student';
        const Object = Student;

        // Act
        const user = await userModel.getUser(testEmail, testPassword, tableName, Object);

        // Assert
        expect(user).toBe(null);
    });

    test('null value for tableName and valid values for remaining parameters', async () => {
        // Arrange
        const testEmail = 'johndoe@gmail.com';
        const testPassword = 'a1234';
        const tableName = null;
        const Object = Student;
        var wasThrown = false;

        // Act
        try {
            const user = await userModel.getUser(testEmail, testPassword, tableName, Object);
        } catch (err) {
            if (err.name = 'InvalidParametersError') wasThrown = true;
        }

        // Assert
        expect(wasThrown).toBe(true);
    });

    test('null value for Object and valid values for remaining parameters', async () => {
        // Arrange
        const testEmail = 'johndoe@gmail.com';
        const testPassword = 'a1234';
        const tableName = 'student';
        const Object = null;

        // Act
        try {
            const user = await userModel.getUser(testEmail, testPassword, tableName, Object);
        } catch (err) {
            if (err.name = 'InvalidParametersError') wasThrown = true;
        }

        // Assert
        expect(wasThrown).toBe(true);
    });

});

describe('testing valid parameters for getUser method', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('valid parameter values', async () => {
        // Arrange
        const studentEmail = 'johndoe@gmail.com';
        const studentPassword = 'a1234';
        const studentTable = 'student';
        const Object = Student;
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
         const user = await userModel.getUser(studentEmail, studentPassword, studentTable, Object);

         // Assert
         expect(user).toMatchObject(studentUser);
    });

});

describe('testing valid and invalid parameters for the isValidUserAccessToken method', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('null access token parameter', async () => {
        // Arrange
        const accessToken = null;
        const userType = 'student';

        // Act
        const isValid = await userModel.isValidUserAccessToken(accessToken, userType);

        // Assert
        expect(isValid).toBe(false);
    });

    test('null user type parameter', async () => {
        // Arrange
        const accessToken = 'XcCa92ZvOnQKZsGtOKOa';
        const userType = null;

        // Act
        const isValid = await userModel.isValidUserAccessToken(accessToken, userType);

        // Assert
        expect(isValid).toBe(false);
    });

    test('all parameters are null', async () => {
        const accessToken = null;
        const userType = null;

        // Act
        const isValid = await userModel.isValidUserAccessToken(accessToken, userType);

        // Assert
        expect(isValid).toBe(false);
    });

    test('all valid parameter values', async () => {
        // Arrange
        const accessToken = 'XcCa92ZvOnQKZsGtOKOa';
        const userType = 'student';

        // Act
        const isValid = await userModel.isValidUserAccessToken(accessToken, userType);

        // Assert
        expect(isValid).toBe(true);
    });

});