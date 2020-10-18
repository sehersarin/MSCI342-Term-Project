const appointmentHandler = require('../../models/handlers/appointment');

describe('testing invalid appointment booking parameters', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('rejection of no parameters', async () => {
        // Arrange
        // No test variables need to be initialized.

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment();

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of null value for required studentId parameter', async () => {
        // Arrange
        const testStudentId = null;
        const testWorkerTimeslotId = 1;
        const testPurpose = "Mental Health Discussion";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of null value for required workerTimeslot parameter', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = null;
        const testPurpose = "Mental Health Discussion";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of null value for required purpose parameter', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = 1;
        const testPurpose = null;

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of empty string value for required studentId parameter', async () => {
        // Arrange
        const testStudentId = '';
        const testWorkerTimeslotId = 1;
        const testPurpose = "Mental Health Discussion";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of empty string value for required workerTimeslot parameter', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = '';
        const testPurpose = "Mental Health Discussion";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of empty string value for required purpose parameter', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = 1;
        const testPurpose = "";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of invalid student id', async () => {
        // Arrange
        const testStudentId = 0;
        const testWorkerTimeslotId = 1;
        const testPurpose = "Mental Health Discussion";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of invalid worker timeslot id', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = 0;
        const testPurpose = "Mental Health Discussion";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

});

describe('testing valid appointment booking parameters', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('empty strings for optional fields', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = 1;
        const testPurpose = "Mental Health Discussion";
        const testStudentNotes = "";
        const testWorkerComments = "";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose, testStudentNotes, testWorkerComments);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('null values for optional fields', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = 1;
        const testPurpose = "Mental Health Discussion";
        const testStudentNotes = null;
        const testWorkerComments = null;

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose, testStudentNotes, testWorkerComments);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('only passing in values for required fields', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = 1;
        const testPurpose = "Mental Health Discussion";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('passing in valid string values for required fields', async () => {
        // Arrange
        const testStudentId = "12345678";
        const testWorkerTimeslotId = "1";
        const testPurpose = "Mental Health Discussion";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('passing in valid values for all fields', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = 1;
        const testPurpose = "Mental Health Discussion";
        const testStudentNotes = "I am having a really hard time balancing school and leisure time. Not sure if it is due to poor time management skills or another factor.";
        const testWorkerComments = "Please prepare a list of upcoming assignments and tests. We can work to prioritize them during our session.";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId, testPurpose, testStudentNotes, testWorkerComments);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });
});

