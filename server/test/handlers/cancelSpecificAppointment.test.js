const workerTimeslotModel = require('../../models/db/workerTimeslot');
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
        const appointmentId = 11;
        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('valid parameters for appointmentId', async () => {
        // Arrange
        const appointmentId = 10;
        const testIsCancelled = true;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });
    //Due to database structure, there will never be a worker timeslot id input into this method that is non-existent and therefore testing cases are complete at this point

});

describe('testing individual worker timeslot status update', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    test('test individual worker timeslot status update ', async () => {
        // Arrange
        const workerTimeslotId = 12;
        const newStatus = 'available';
        const updatedSuccessfully = true;

        // Act
        const isUpdated = await workerTimeslotModel.updateIndividualWorkerAvailability(workerTimeslotId, newStatus);

        // Assert
        expect(isUpdated).toBe(updatedSuccessfully);
    });

    test('test individual worker timeslot status update with invalid workertimeslot ', async () => {
        // Arrange
        const workerTimeslotId = 'hello';
        const newStatus = 'available';
        const updatedSuccessfully = false;

        // Act
        const isUpdated = await workerTimeslotModel.updateIndividualWorkerAvailability(workerTimeslotId, newStatus);

        // Assert
        expect(isUpdated).toBe(updatedSuccessfully);
    });
})
