const appointmentHandler = require('../../models/handlers/workerTimeslot');

describe('testing invalid user schedule input', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('rejection of null values for worker and school ID', async () => {
        // Arrange
        const testWorkerId = null;
        const testSchoolId = null;

        // Act
        const user = await workerTimeslotHandler.addWorkerTimeslot(testWorkerId, testschoolId);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of empty values for worker and school ID', async () => {
        // Arrange
        const testWorkerId = '';
        const testSchoolId = '';
    
        // Act
        const user = await authenticateHandler.addWorkerTimeslot(testWorkerId, testSchoolId);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of invalid worker and school ID', async () => {
        // Arrange
        const testWorkerId = 'Invalid Worker ID';
        const testSchoolId = 'Invalid School ID';
        // Act
        const user = await authenticateHandler.addWorkerTimeslot(testWorkerId, testSchoolId);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of worker ID', async () => {
        // Arrange
        const testWorkerId = 'Invalid Worker ID';
        const testSchoolId = '001';

        // Act
        const user = await authenticateHandler.addWorkerTimeslot(testWorkerId, testSchoolId);

        // Assert
        expect(user).toBe(null);
    });

    test('rejection of school ID', async () => {
        // Arrange
        const testWorkerId = '100789';
        const testSchoolId = 'Invalid School ID';

        // Act
        const user = await authenticateHandler.addWorkerTimeslot(testWorkerId, testSchoolId);
        // Assert
        expect(user).toBe(null);
    });
});

describe('testing valid user validation', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });
});

