const availabilityHandler = require('../../models/handlers/availability');

describe('testing fetching of worker availability functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    //TEST 1
    test('rejection of no parameters', async () => {
        // Arrange
        // No test variables need to be initialized.
        const workerId = null;
        const schoolId = null;
        const startTime = null;
        const endTime = '8:30:00';
        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toBe(null);
    });

    //TEST 2

    test('rejection of null value for required workerId parameter', async () => {
        // Arrange
        const workerId = null;
        const schoolId = 1;
        const startTime = '8:00:00';
        const endTime = '8:30:00';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toBe(null);
    });

    //TEST 3

    test('rejection of null value for required SchoolId parameter', async () => {
        // Arrange
        const workerId = 8000000;
        const schoolId = null;
        const startTime = '8:00:00';
        const endTime = '8:30:00';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toBe(null);
    });

//TEST 4

test('rejection of null value for required startTime parameter', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = null;
    const endTime = '8:30:00';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    expect(availableTimes).toBe(null);
});

//TEST 5

test('rejection of null value for required endTime parameter', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = '8:00:00';
    const endTime = null;

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    expect(availableTimes).toBe(null);
});

//TEST 6

test('rejection of empty string value for required workerId parameter', async () => {
    // Arrange
    const workerId = '';
    const schoolId = 1;
    const startTime = '8:00:00';
    const endTime = '8:30:00';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    expect(availableTimes).toBe(null);
});

//TEST 7
test('rejection of empty string value for required schoolId parameter', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = '';
    const startTime = '8:00:00';
    const endTime = '8:30:00';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    expect(availableTimes).toBe(null);
});
//TEST 8

test('rejection of empty string value for required startTime parameter', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = '';
    const endTime = '8:30:00';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    expect(availableTimes).toBe(null);
});
//TEST 9
test('rejection of empty string value for required endTime parameter', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = '8:00:00';
    const endTime = '';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    expect(availableTimes).toBe(null);
});
/*
//TEST 10
test('rejection of invalid workerId', async () => {
 // Arrange
 const workerId = 0;
 const schoolId = 1;
 const startTime = '8:00:00';
 const endTime = '8:30:00';

 // Act
 const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

 // Assert
 expect(availableTimes).toBe(null);
});
*/

/* The following code is the test for the stub which will be deleted once this PR is approved.
    //stub
    test('initial setup of worker availability fetching', async () => {
        // Arrange
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = '8:30:00';
        const endTime = '8:30:00';

        const testAvailableTimes = [
            {
                workerTimeslotId: 1,
                startTime: '08:00:00',
                endTime: '08:30:00',
                date: '8:30:00'
            },
            {
                workerTimeslotId: 2,
                startTime: '08:30:00',
                endTime: '09:00:00',
                date: '8:30:00'
            },
            {
                workerTimeslotId: 3,
                startTime: '09:00:00',
                endTime: '09:30:00',
                date: '8:30:00'
            }
        ];

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toMatchObject(testAvailableTimes);
    });
    */

})