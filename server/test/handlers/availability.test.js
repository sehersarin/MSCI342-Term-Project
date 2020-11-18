const availabilityHandler = require('../../models/handlers/availability');

describe('testing fetching of worker availability functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    //TEST 1
    test('rejection of null parameters', async () => {
        // Arrange
        // No test variables need to be initialized.
        const workerId = null;
        const schoolId = null;
        const startTime = null;
        const endTime = '2020-10-20';
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
        const startTime = '2020-10-19';
        const endTime = '2020-10-20';

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
        const startTime = '2020-10-19';
        const endTime = '2020-10-20';

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
        const endTime = '2020-10-20';

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
        const startTime = '2020-10-19';
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
        const startTime = '2020-10-19';
        const endTime = '2020-10-20';

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
        const startTime = '2020-10-19';
        const endTime = '2020-10-20';

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
        const endTime = '2020-10-20';

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
        const startTime = '2020-10-19';
        const endTime = '';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toBe(null);
    });

     //TEST 10
     test('Accept that all valid paramters return the expected values ', async () => {
        // Arrange
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = '2020-10-19';
        const endTime = '2020-10-21';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toBeDefined();
    });

    //TEST 11
test('Accept that all valid paramters but no availible timeslots exist for the specified date range returns null ', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = '2020-10-15';
    const endTime = '2020-10-16';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    expect(availableTimes).toBe(null);
});

   //TEST 12
   test('The case where the specified endTime is earlier than the endTime returns null ', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = '2020-10-16';
    const endTime = '2020-10-15';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    expect(availableTimes).toBe(null);
});

})