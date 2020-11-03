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
        expect(availableTimes).toMatchObject(testAvailableTimes);
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

})