const appointmentHandler = require('../../models/handlers/appointment');

describe('testing cancellation of worker appointments on specific day', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('no parameters passed in for the method', async() => {
        // Arrange
        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments();

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('null values for both parameters of workerId and specificDate', async() => {
        // Arrange
        const workerId = null;
        const specificDate = null;

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('empty string for the workerId', async() => {
        // Arrange
        const workerId = '';
        const specificDate = '2020-12-20';

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('invalid value for the workerId', async() => {
        // Arrange
        const workerId = true;
        const specificDate = '2020-12-20';

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('empty string for the date', async() => {
        // Arrange
        const workerId = 8000000;
        const specificDate = '';

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('invalid value for the date', async() => {
        // Arrange
        const workerId = 8000000;
        const specificDate = 'hello';

        const testIsCancelled = false;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('valid parameters for workerId and specificDate', async() => {
        // Arrange
        const workerId = 8000000;
        const specificDate = '2020-12-20';

        const testIsCancelled = true;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

    test('valid string value for the workerId', async() => {
        // Arrange
        const workerId = '8000000';
        const specificDate = '2020-12-20';

        const testIsCancelled = true;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

})