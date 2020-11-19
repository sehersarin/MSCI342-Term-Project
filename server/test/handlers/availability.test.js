const availabilityHandler = require('../../models/handlers/availability');

describe('testing fetching of worker availability functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    //TEST 1
    test('Rejection of null parameters', async () => {
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
    test('Rejection of null value for required workerId parameter', async () => {
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
    test('Acceptance of a null value for the SchoolId parameter', async () => {
        
        // Arrange
        //A null value for the SchoolId parameter is allowed and should return a non-null result for the worker availability corresponding to the specified workerId
        const workerId = 8000000;
        const schoolId = null;
        const startTime = '2020-10-19';
        const endTime = '2020-10-20';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        //Should return a non-null result for the worker availability corresponding to the specified workerId
        expect(availableTimes).toBeDefined();
    });

    //TEST 4
    test('Acceptance of a null value for the `startTime` parameter.', async () => {
       
        // Arrange
        //A null value for the `startTime` parameter is allowed and should return a non-null result for the worker availability corresponding to the specified workerId.
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = null;
        const endTime = '2020-10-20';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        //Should return a non-null result for the worker availability corresponding to the specified workerId.
        expect(availableTimes).toBeDefined();
    });

    //TEST 5
    test('Acceptance of a null value for the `endTime` parameter', async () => {
    
        //A null value for the `endTime` parameter is allowed and should return a non-null result for the worker availability corresponding to the specified workerId.
        // Arrange
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = '2020-10-19';
        const endTime = null;

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toBeDefined();
    });

    //TEST 6
    test('Rejection of empty string value for required workerId parameter', async () => {
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
    test('Acceptance of an empty string value for the schoolId parameter', async () => {
        // Arrange
        const workerId = 8000000;
        const schoolId = '';
        const startTime = '2020-10-19';
        const endTime = '2020-10-20';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        //If an empty value is passed for `schoolId`, it is allowed and should return a non-null result for the worker availability corresponding to the specified workerId.
        expect(availableTimes).toBeDefined();
    });

    //TEST 8
    test('Acceptance of an empty string value for the startTime parameter', async () => {
        // Arrange
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = '';
        const endTime = '2020-10-20';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        //If an empty value is passed for `startTime`, it is allowed and should return a non-null result for the worker availability corresponding to the specified workerId.
        expect(availableTimes).toBeDefined();
    });

    //TEST 9
    test('Acceptance of an empty string value for the endTime parameter', async () => {
        // Arrange
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = '2020-10-19';
        const endTime = '';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        //If an empty value is passed for `endTime`, it is allowed and should return a non-null result for the worker availability corresponding to the specified workerId.
        expect(availableTimes).toBeDefined();
    });

     //TEST 10
     test('Acceptance of all valid and non-null parameters for workerId, schoolId, startTime, and endTime (Happy path)', async () => {
        // Arrange
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = '2020-10-19';
        const endTime = '2020-10-21';

        // Act
        const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

        // Assert
        //Should return a non-null result for the worker availability corresponding to the specified workerId, schoolId, startTime, and endTime.
        expect(availableTimes).toBeDefined();
    });

    //TEST 11
test('Accept all valid and non-null parameters which correspond to no existing worker availabilities (return null)', async () => {
   
    // Arrange
    
    //Accept all valid and non-null parameters entered for workerId, schoolId, startTime, and endTime,
    // where there are no exisiting availible timeslots for the specified workerId between
    // the date range of the specified startTime, and endTime 
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = '2020-10-15';
    const endTime = '2020-10-16';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    //Should return null to indicate that there are no exisiting availible timeslots for the specified workerId between
    // the date range of the specified startTime, and endTime 
    expect(availableTimes).toBe(null);
});

   //TEST 12
   test('Rejection of the case where the specified endTime is earlier than the endTime', async () => {
    // Arrange
    const workerId = 8000000;
    const schoolId = 1;
    const startTime = '2020-10-16';
    const endTime = '2020-10-15';

    // Act
    const availableTimes = await availabilityHandler.getAvailabilityDetails(workerId, schoolId, startTime, endTime);

    // Assert
    ////Should return null to indicate that there are no exisiting availible timeslots between
    // the invalid date range of the specified startTime, and endTime 
    expect(availableTimes).toBe(null);
});

})