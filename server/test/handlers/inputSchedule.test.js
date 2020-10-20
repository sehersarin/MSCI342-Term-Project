const appointmentHandler = require('../../models/handlers/workerTimeslot');

describe('testing invalid user schedule input', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('rejection of null values for worker and school ID', async () => {
        // Arrange
        const testworkerId = null;
        const testschoolId = null;

        // Act
        const user = await workerTimeslotHandler.addWorkerTimeslot(testworkerID, testschoolID);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of empty values for worker and school ID', async () => {
        // Arrange
        const testworkerId = '';
        const testschoolId = '';
    
        // Act
        const user = await authenticateHandler.addWorkerTimeslot(testworkerID, testschoolID);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of invalid worker and school ID', async () => {
        // Arrange
        const testworkerID = 'Invalid Worker ID';
        const testschoolID = 'Invalid School ID';
        // Act
        const user = await authenticateHandler.addWorkerTimeslot(testworkerID, testschoolID);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of worker ID', async () => {
        // Arrange
        const testworkerID = 'Invalid Worker ID';
        const testschoolID = '001';

        // Act
        const user = await authenticateHandler.addWorkerTimeslot(testworkerID, testschoolID);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of school ID', async () => {
        // Arrange
        const testworkerID = '100789';
        const testschoolID = 'Invalid School ID';

        // Act
        const user = await authenticateHandler.addWorkerTimeslot(testworkerID, testschoolID);
        // Assert
        expect(user).toBe(null);
    });
});

describe('testing valid user validation', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });
});

