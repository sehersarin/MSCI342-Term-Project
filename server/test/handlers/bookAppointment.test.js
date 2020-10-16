const appointmentHandler = require('../../models/handlers/appointment');

describe('testing invalid appointment booking parameters', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('rejection of null value for required studentId parameter', async () => {
        // Arrange
        const testStudentId = null;
        const testWorkerTimeslotId = 1;

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of null value for required workerTimeslot parameter', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = null;

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of empty string value for required studentId parameter', async () => {
        // Arrange
        const testStudentId = '';
        const testWorkerTimeslotId = 1;

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of empty string value for required workerTimeslot parameter', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = '';

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of invalid student id', async () => {
        // Arrange
        const testStudentId = 0;
        const testWorkerTimeslotId = 1;

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId);

        // Assert
        expect(isSuccessfullyInserted).toBe(false);
    });

    test('rejection of invalid worker timeslot id', async () => {
        // Arrange
        const testStudentId = 12345678;
        const testWorkerTimeslotId = 0;

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId);

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
        const testPurpose = "";
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
        const testPurpose = null;
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

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });

    test('passing in valid string values for required fields', async () => {
        // Arrange
        const testStudentId = "12345678";
        const testWorkerTimeslotId = "1";

        // Act
        const isSuccessfullyInserted = await appointmentHandler.bookAppointment(testStudentId, testWorkerTimeslotId);

        // Assert
        expect(isSuccessfullyInserted).toBe(true);
    });
});

