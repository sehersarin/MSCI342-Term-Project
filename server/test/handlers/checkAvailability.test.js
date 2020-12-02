const workerTimeslotHandler = require('../../models/handlers/workerTimeslot');

describe('Test to check expected returns of checkAvailability functionality ', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    ///TEST 1
    test('rejection of null workerTimeslotId', async () => {
        // Arrange
        // No test variables need to be initialized.
        const workerTimeslotId = null;

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(false);
    });

    //TEST 2
    test('rejection of an empty string value for workerTimeslotId', async () => {
        // Arrange
        const workerTimeslotId = '';

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(false);
    });

    //TEST 3
    test('rejection of an filled string value for workerTimeslotId', async () => {
        // Arrange
        const workerTimeslotId = 'good_day_sire';

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(false);
    });
    
    //TEST 4
    test('check valid workerTimeslotId for true return ', async () => {
        // Arrange
        const workerTimeslotId = 6;

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(true);
    });

    //TEST 5

    /*PLEASE NOTE: Test case 5 is conditional provided that the status of the
     `workerTimeslotId` = 5 must be unavailable. The same database is being used 
     by multiple methods which edit the status of the entries in the worker_Timeslot
      table (eg. S15-T2 updates the status of a specified `workerTimeslotId` and 
      the S19-T2 changes the status from unavailable to available when an appointment 
      is cancelled). Due to this, the value of the status parameter is constantly
       changing. The test cases were run and passed successfully when the status of
        the `workerTimeslotId` = 5 was known to be unavailable. */

    test('Rejection of a non-existent value for the required `workerTimeslotId` parameter', async () => {
        // Arrange
        const workerTimeslotId = 5;

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(false);

        //If a non-existent value is passed for the `workerTimeslotId` parameter 
        //(where there is no corresponding entry in the database), the output 
        //of the returned workerIsAvailable should be false
        // (indicating that a worker_timeslot_id corresponding to the given 
        //`workerTimeslotId` does not exist, and thus the status is
        // by default not equal to available).
    });

    //TEST 6
    test('check invalid workerTimeslotId parameter ', async () => {
        // Arrange
        const workerTimeslhellotId = 483;

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslhellotId);

        // Assert
        expect(workerIsAvailable).toBe(false);
    });
});