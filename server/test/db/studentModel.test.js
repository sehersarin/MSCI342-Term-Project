const studentModel = require('../../models/db/student');

describe('testing parameters for getStudent method', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('null value for email and valid password', async () => {
        // Arrange
        const testEmail = null;
        const testPassword = 'a1234';

        // Act
        const user = await studentModel.getStudent(testEmail, testPassword);

        // Assert
        expect(user).toBe(null);
    });

    test('null value for password and valid email', async () => {
        // Arrange
        const testEmail = 'johndoe@gmail.com';
        const testPassword = null;

        // Act
        const user = await studentModel.getStudent(testEmail, testPassword);

        // Assert
        expect(user).toBe(null);
    });

    test('valid parameter values', async () => {
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
         const user = await studentModel.getStudent(studentEmail, studentPassword);

         // Assert
         expect(user).toMatchObject(studentUser);
    });

});