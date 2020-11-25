const appointmentHandler = require('../../models/handlers/appointment');

describe('testing cancellation of specific worker appointments', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('no parameters passed in for the method', async() => {
        // Arrange
        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment();

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('null values for appointmentId parameter', async() => {
        // Arrange
        const appointmentId = null;
        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('empty string for the appointmentId', async() => {
        // Arrange
        const appointmentId = '';

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('invalid true value for the appointmentId', async() => {
        // Arrange
        const appointmentId = true;

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('invalid number value for the appointmentId', async() => {
        // Arrange
        const appointmentId = 5;

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('valid parameters for appointmentId', async() => {
        // Arrange
        const appointmentId = 1;

        const testIsCancelled = true;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('valid string value for the appointmentId', async() => {
        // Arrange
        const appointmentId = '2';

        const testIsCancelled = true;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelSpecificAppointment(appointmentId);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

})
