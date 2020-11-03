const availabilityHandler = require('../../models/handlers/availability');

describe('testing fetching of worker availability functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    //TEST 1
    test('rejection of no parameters', async () => {
        // Arrange
        // No test variables need to be initialized.

        // Act
        const availableTimes = await availabilityHandler.getWorkerAvailability(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).tobe(null);
    });

    //TEST 2

    test('rejection of null value for required workerId parameter', async () => {
        // Arrange
        const testWorkerId = null;
        const testSchoolId = 1;
        const testStartTime = '2020-10-20';
        const testEndTime = '2020-10-20';

        // Act
        const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

        // Assert
        expect(availableTimes).tobe(null);
    });

    //TEST 3

    test('rejection of null value for required SchoolId parameter', async () => {
        // Arrange
        const testWorkerId = 8000000;
        const testSchoolId = null;
        const testStartTime = '2020-10-20';
        const testEndTime = '2020-10-20';

        // Act
        const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

        // Assert
        expect(availableTimes).tobe(null);
    });

//TEST 4

test('rejection of null value for required startTime parameter', async () => {
    // Arrange
    const testWorkerId = 8000000;
    const testSchoolId = 1;
    const testStartTime = null;
    const testEndTime = '2020-10-20';

    // Act
    const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

    // Assert
    expect(availableTimes).tobe(null);
});

//TEST 5

test('rejection of null value for required endTime parameter', async () => {
    // Arrange
    const testWorkerId = 8000000;
    const testSchoolId = 1;
    const testStartTime = '2020-10-20';
    const testEndTime = null;

    // Act
    const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

    // Assert
    expect(availableTimes).tobe(null);
});

//TEST 6

test('rejection of empty string value for required workerId parameter', async () => {
    // Arrange
    const testWorkerId = '';
    const testSchoolId = 1;
    const testStartTime = '2020-10-20';
    const testEndTime = '2020-10-20';

    // Act
    const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

    // Assert
    expect(availableTimes).tobe(null);
});

//TEST 7
test('rejection of empty string value for required schoolId parameter', async () => {
    // Arrange
    const testWorkerId = 8000000;
    const testSchoolId = '';
    const testStartTime = '2020-10-20';
    const testEndTime = '2020-10-20';

    // Act
    const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

    // Assert
    expect(availableTimes).tobe(null);
});
//TEST 8

test('rejection of empty string value for required startTime parameter', async () => {
    // Arrange
    const testWorkerId = 8000000;
    const testSchoolId = 1;
    const testStartTime = '';
    const testEndTime = '2020-10-20';

    // Act
    const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

    // Assert
    expect(availableTimes).tobe(null);
});
//TEST 9
test('rejection of empty string value for required endTime parameter', async () => {
    // Arrange
    const testWorkerId = 8000000;
    const testSchoolId = 1;
    const testStartTime = '2020-10-20';
    const testEndTime = '';

    // Act
    const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

    // Assert
    expect(availableTimes).tobe(null);
});

//TEST 10
test('rejection of invalid workerId', async () => {
 // Arrange
 const testWorkerId = 0;
 const testSchoolId = 1;
 const testStartTime = '2020-10-20';
 const testEndTime = '2020-10-20';

 // Act
 const availableTimes = await availabilityHandler.getWorkerAvailability(testWorkerId, testSchoolId, testStartTime, testEndTime);

 // Assert
 expect(availableTimes).tobe(null);
});

/* The following code is the test for the stub which will be deleted once this PR is approved.
    //stub
    test('initial setup of worker availability fetching', async () => {
        // Arrange
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = '2020-10-20';
        const endTime = '2020-10-20';

        const testAvailableTimes = [
            {
                workerTimeslotId: 1,
                startTime: '08:00:00',
                endTime: '08:30:00',
                date: '2020-10-20'
            },
            {
                workerTimeslotId: 2,
                startTime: '08:30:00',
                endTime: '09:00:00',
                date: '2020-10-20'
            },
            {
                workerTimeslotId: 3,
                startTime: '09:00:00',
                endTime: '09:30:00',
                date: '2020-10-20'
            }
        ];

        // Act
        const availableTimes = await availabilityHandler.getWorkerAvailability(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toMatchObject(testAvailableTimes);
    });
    */

})