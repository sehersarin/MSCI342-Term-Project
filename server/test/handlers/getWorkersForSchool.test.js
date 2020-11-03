const schoolHandler = require('../../models/handlers/school');

describe('testing user to input schoolID to see worker ID ', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

test('Initial setup for getting workers for the school', async () => {
    // Arrange
    const testSchoolId = '1';

    // Act
    const testWorkerIds=[8000000, 8000001, 8000002, 8000003]
    const workerIds = await schoolHandler.getWorkerIdsForSchool(testSchoolId);

    // Assert
    expect(workerIds).toStrictEqual(testWorkerIds);
});

//The following tests are for endpoint testing for the logic of the code 
//test('rejection of no parameters', async () => {
// Arrange
// No test variables need to be initialized.

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool();
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
//});

//test('rejection of null value for required schoolId parameter', async () => {
// Arrange
//const testschoolId= null;

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
//});

//test('rejection of empty string value for required schoolId parameter', async () => {
// Arrange
//const testschoolId = '';

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
//});

//test('rejection of invalid school id', async () => {
// Arrange
//const testschoolId = 0;

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
//});
//});

//describe('testing valid school ID parameters', () => {
//beforeEach(() => {
//jest.resetModules(); // Clears any cache between tests.
//});

//test('empty strings for optional fields', async () => {
// Arrange
//const testschoolId = 1;

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
//});

//test('null values for optional fields', async () => {
// Arrange
//const testschoolId = 1;

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
//});

//test('only passing in values for required fields', async () => {
// Arrange
//const testschoolId = 1;

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
//});

//test('passing in valid string values for required fields', async () => {
// Arrange
//const testschoolId = "1";

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
//});

//test('passing in valid values for all fields', async () => {
// Arrange
//const testschoolId = 1;

// Act
//const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);
//const workerIds = await schoolHandler.getWorkerIdsForSchool();

// Assert
//expect(workerIds).toStrictEqual(workerIds);
    //});
});