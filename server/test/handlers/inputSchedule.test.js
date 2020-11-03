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
});

//This is a test code for when the logic of the backend has been successfully implemented for this functionality 

// describe('testing invalid user schedule input', () => {
//     beforeEach(() => {
//         jest.resetModules(); // Clears any cache between tests.
//     });

//     test('rejection of null values for worker, school, slot ID as well as status', async () => {
//         // Arrange
//         const testWorkerId = null;
//         const testSchoolId = null;
//         const testSlotId= null; 
//         const testStatus=null;

//         // Act
//         const isSuccessfullyInserted = await timeslotHandler.addWorkerTimeslot(testWorkerId, testschoolId, testSlotId, testStatus);

//         // Assert
//         expect(isSuccessfullyInserted).toBe(false);
//     });

//     test('rejection of empty values for worker and school ID', async () => {
//         // Arrange
//         const testWorkerId = '';
//         const testSchoolId = '';
//         const testSlotId= ''; 
//         const testStatus='';

//         // Act
//         const user = await timeslotHandler.addWorkerTimeslot(testWorkerId, testSchoolId,testSlotId, testStatus);

//         // Assert
//         expect(user).toBe(null);
//     });

//     test('rejection of invalid worker and school ID', async () => {
//         // Arrange
//         const testWorkerId = 'Invalid Worker ID';
//         const testSchoolId = 'Invalid School ID';
//         const testSlotId= 'Invalid Slot ID'; 
//         const testStatus='Invalid Status';
//         // Act
//         const user = await workerTimeslotHandler.addWorkerTimeslot(testWorkerId, testSchoolId,testSlotId,testStatus);

//         // Assert
//         expect(user).toBe(null);
//     });

//     test('rejection of worker ID', async () => {
//         // Arrange
//         const testWorkerId = 'Invalid Worker ID';
//         const testSchoolId = '001';
//         const testSlotId= 'Invalid Slot ID'; 
//         const testStatus='Invalid Status';

//         // Act
//         const user = await timeslotHandler.addWorkerTimeslot(testWorkerId, testSchoolId);

//         // Assert
//         expect(user).toBe(null);
//     });

//     test('rejection of school ID', async () => {
//         // Arrange
//         const testWorkerId = '100789';
//         const testSchoolId = 'Invalid School ID';

//         // Act
//         const user = await timeslotHandler.addWorkerTimeslot(testWorkerId, testSchoolId);
//         // Assert
//         expect(user).toBe(null);
//     });
// });

// describe('testing valid user validation', () => {
//     beforeEach(() => {
//         jest.resetModules(); // Clears any cache between tests.
//     });
// });

