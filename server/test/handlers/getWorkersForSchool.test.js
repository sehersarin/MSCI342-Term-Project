const schoolHandler = require('../../models/handlers/school');

describe('testing invalid schoolId parameters', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('rejection of no parameters', async () => {
        // Arrange
        // No test variables need to be initialized.

        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool();

        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });

    test('rejection of null value for required schoolId parameter', async () => {
        // Arrange
        const testschoolId= null;
        
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });

    test('rejection of empty string value for required schoolId parameter', async () => {
        // Arrange
        const testschoolId = '';

        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });

    test('rejection of invalid school id', async () => {
        // Arrange
        const testschoolId = 0;
        
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });
});

describe('testing valid school ID parameters', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('empty strings for optional fields', async () => {
        // Arrange
        const testschoolId = 1;
    
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });

    test('null values for optional fields', async () => {
        // Arrange
        const testschoolId = 1;
        
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });

    test('only passing in values for required fields', async () => {
        // Arrange
        const testschoolId = 1;

        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });

    test('passing in valid string values for required fields', async () => {
        // Arrange
        const testschoolId = "1";

        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testschoolId);
       
        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });

    test('passing in valid values for all fields', async () => {
        // Arrange
        const testschoolId = 1;
   
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(workerIds);
    });
});