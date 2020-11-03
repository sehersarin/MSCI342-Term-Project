const workerTimeslotHandler = require('../../models/handlers/workerTimeslot');

describe('testing inputting of worker schedule functionality', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('testing valid values for inputting worker schedule ', async () => {
        // Arrange
        const testWorkerId = '8000000';
        const testSchoolId = '1';
        const testSlotId = '1';
        const testDate = '2020-12-21';  
        const testStatus = 'available';    

        // Act
        const isSuccessfullyInserted = await workerTimeslotHandler.addWorkerTimeslot(testSlotId, testSchoolId, testWorkerId, testStatus, testDate);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('testing invalid values for inputting worker schedule ', async () => {
        // Arrange
        const testWorkerId = null ;
        const testSchoolId = '1';
        const testSlotId = '1';
        const testDate = '2020-12-21'; 
        const testStatus = 'available';       

        // Act
        const isSuccessfullyInserted = await workerTimeslotHandler.addWorkerTimeslot(testSlotId, testSchoolId, testWorkerId, testStatus, testDate);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('testing valid values for inputting worker schedule with default for status', async () => {
        // Arrange
        const testWorkerId = '8000000';
        const testSchoolId = '1';
        const testSlotId = '1';
        const testDate = '2020-12-20'; 
        const testStatus = null;       

        // Act
        const isSuccessfullyInserted = await workerTimeslotHandler.addWorkerTimeslot(testSlotId, testSchoolId, testWorkerId, testStatus, testDate);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });
});
