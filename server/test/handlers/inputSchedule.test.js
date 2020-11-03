const timeslotHandler = require('../../models/handlers/workerTimeslot');

describe('testing inputting of worker schedule functionality', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('testing valid values for inputting worker schedule ', async () => {
        // Arrange
        const testWorkerId = '8000000';
        const testSchoolId = '1';
        const testSlotId = '1';
        const testDate = '2020-12-28';  
        const testStatus = 'available';    

        // Act
        const isSuccessfullyInserted = await timeslotHandler.addWorkerTimeslot(testSlotId, testSchoolId, testWorkerId, testStatus, testDate);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('testing invalid values for inputting worker schedule ', async () => {
        // Arrange
        const testWorkerId = null ;
        const testSchoolId = '1';
        const testSlotId = '1';
        const testDate = '2020-12-28'; 
        const testStatus = 'available';       

        // Act
        const isSuccessfullyInserted = await timeslotHandler.addWorkerTimeslot(testSlotId, testSchoolId, testWorkerId, testStatus, testDate);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('testing valid + status default value for inputting worker schedule ', async () => {
        // Arrange
        const testWorkerId = '8000000';
        const testSchoolId = '1';
        const testSlotId = '1';
        const testDate = '2020-12-29'; 
        const testStatus = '';       

        // Act
        const isSuccessfullyInserted = await timeslotHandler.addWorkerTimeslot(testSlotId, testSchoolId, testWorkerId, testStatus, testDate);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });
});
