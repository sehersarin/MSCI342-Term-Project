const appointmentHandler = require('../../models/handlers/appointment');

describe('testing invalid schoolId parameters', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('rejection of no parameters', async () => {
        // Arrange
        // No test variables need to be initialized.

        // Act
<<<<<<< Updated upstream
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool();
=======
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchooll();
>>>>>>> Stashed changes

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of null value for required schoolId parameter', async () => {
        // Arrange
        const testSchoolId = null;
        
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testSchoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of empty string value for required schoolId parameter', async () => {
        // Arrange
        const testStudentId = '';

        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testSchoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of invalid school id', async () => {
        // Arrange
        const testStudentId = 0;
<<<<<<< Updated upstream
        
=======

>>>>>>> Stashed changes
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testSchoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });
});

describe('testing valid school ID parameters', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('empty strings for optional fields', async () => {
        // Arrange
        const testSchoolId = 1;
<<<<<<< Updated upstream
    
=======

>>>>>>> Stashed changes
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testSchoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('null values for optional fields', async () => {
        // Arrange
        const testSchoolId = 1;
<<<<<<< Updated upstream

=======
       
>>>>>>> Stashed changes
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testSchoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('only passing in values for required fields', async () => {
        // Arrange
        const testSchoolId = 1;

        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testSschoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('passing in valid string values for required fields', async () => {
        // Arrange
        const testStudentId = "1";

        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testSchoolId);
<<<<<<< Updated upstream
=======
        
>>>>>>> Stashed changes
        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('passing in valid values for all fields', async () => {
        // Arrange
        const testSchoolId = 1;
   
        // Act
        const isSuccessfullyInserted = await schoolHandler.getWorkerIdsForSchool(testSchoolId);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });
});