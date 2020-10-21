const timeslotModel = require('../../models/db/timeslot');

describe('testing parameters for getWorker method', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('null value for email and valid password', async () => {
        // Arrange
        const testEmail = null;
        const testPassword = 'j1234';

        // Act
        const isTimelslotInserted = await timeslotModel.insertWorkerTimeslot(testEmail, testPassword);

        // Assert
        expect(isTimelslotInserted).toBe(null);
    });

    test('null value for password and valid email', async () => {
        // Arrange
        const testEmail = 'joshuabrooks@gmail.com';
        const testPassword = null;

        // Act
        const user = await timeslotModel.insertWorkerTimeslot(testEmail, testPassword);

        // Assert
        expect(user).toBe(null);
    });

    test('valid parameter values', async () => {
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
         const user = await timeslotModel.insertWorkerTimeslot(workerEmail, workerPassword);

         // Assert
         expect(user).toMatchObject(workerUser);
    });

});