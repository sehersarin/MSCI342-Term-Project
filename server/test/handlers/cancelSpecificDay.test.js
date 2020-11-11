const appointmentHandler = require('../../models/handlers/appointment');

describe('testing cancellation of worker appointments on specific day', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('initial setup of worker cancel specific day functionality', async() => {
        // Arrange
        const workerId = 8000000;
        const startTime = '2020-12-20 08:00:00';
        const endTime = '2020-12-20 10:30:00';

        const testIsCancelled = true;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, startTime, endTime);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

})
