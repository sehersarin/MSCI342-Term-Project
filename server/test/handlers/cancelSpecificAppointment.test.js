const workerTimeslot = require('../../models/db/workerTimeslot');
const appointmentHandler = require('../../models/handlers/appointment');
const workerTimeslotHandler = require('../../models/handlers/workerTimeslot');

describe('testing cancellation of specific worker appointments', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('no parameters passed in for the method', async () => {
        // Arrange
        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment();

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('null values for appointmentId parameter', async () => {
        // Arrange
        const appointmentId = null;
        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('empty string for the appointmentId', async () => {
        // Arrange
        const appointmentId = '';

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('invalid true value for the appointmentId', async () => {
        // Arrange
        const appointmentId = true;

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('invalid number value for the appointmentId', async () => {
        // Arrange
        const appointmentId = 37;

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('valid parameters for appointmentId', async () => {
        // Arrange
        const appointmentId = 38;

        const testIsCancelled = true;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('1 test individual worker timeslot status update ', async () => {
        // Arrange
        const workerTimeslotId = 23;
        const newStatus = 'available';

        const updatedSuccessfully = true;

        // Act
        const isUpdated = await workerTimeslotHandler.updateIndividualWorkerAvailability(workerTimeslotId, newStatus);

        // Assert
        expect(isUpdated).toBe(updatedSuccessfully);
    });

    test('2 test individual worker timeslot status update', async () => {
        // Arrange
        const workerTimeslotId = 103;
        const newStatus = 'available';

        const updatedSuccessfully = false;

        // Act
        const isUpdated = await workerTimeslotHandler.updateIndividualWorkerAvailability(workerTimeslotId, newStatus));

        // Assert
        expect(isUpdated).toBe(updatedSuccessfully);
    });



})
