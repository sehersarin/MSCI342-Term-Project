const workerTimeslotHandler = require('../../models/handlers/workerTimeslot');

describe('Test to check valid account creation', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    ///TEST 1
    test('rejection of null parameters', async () => {
        // Arrange
        // No test variables need to be initialized.
        const slotId = null;
        const workerId  = null;
        const status = null;
        const date = '2020-10-20';
        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

        // Assert
        expect(workerIsAvailable).toBe(null);
    });
 //TEST 2
 test('rejection of null value for required slotId parameter', async () => {
    // Arrange
    const slotId = null;
    const workerId  = 80000000;
    const status = available;
    const date = '2020-10-20';
    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBe(null);
});

//TEST 3
ttest('rejection of null value for required workerId parameter', async () => {
    // Arrange
    const slotId = 1;
    const workerId  = null;
    const status = available;
    const date = '2020-10-20';
    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBe(null);
});

//TEST 4
ttest('rejection of null value for the status parameter', async () => {
    // Arrange
    const slotId = 1;
    const workerId  = 80000000;
    const status = null;
    const date = '2020-10-20';
    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBe(null);
});

//TEST 5
ttest('accept null value for the date parameter', async () => {
    // Arrange
    const slotId = 1;
    const workerId  = 80000000;
    const status = available;
    const date = null;
    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBeDefined();
});

//TEST 6
test('rejection of an empty string value for required slotId parameter', async () => {
    // Arrange
    const slotId = '';
    const workerId  = 80000000;
    const status = available;
    const date = '2020-10-20';
    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBe(null);
});

//TEST 7
ttest('rejection of an empty string value for required workerId parameter', async () => {
    // Arrange
    const slotId = 1;
    const workerId  = '';
    const status = available;
    const date = '2020-10-20';
    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBe(null);
});

//TEST 8
ttest('rejection of an empty string value for the status parameter', async () => {
    // Arrange
    const slotId = 1;
    const workerId  = 80000000;
    const status = '';
    const date = '2020-10-20';
    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBe(null);
});

//TEST 9
ttest('accept null value for the date parameter', async () => {
    // Arrange
    const slotId = 1;
    const workerId  = 80000000;
    const status = available;
    const date = '';
    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBeDefined();
});


 //TEST 10
 test('Accept that all valid paramters return the expected values ', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = '2020-10-19';
    const endTime = '2020-10-21';

    // Act
    const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(slotId, workerId, status, date);

    // Assert
    expect(workerIsAvailable).toBeDefined();
});


   
    });