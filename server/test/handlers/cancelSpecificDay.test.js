const appointmentHandler = require('../../models/handlers/appointment');

describe('testing cancellation of worker appointments on specific day', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('initial setup of worker cancel specific day functionality', async() => {
        // Arrange
        const workerId = 8000000;
        const specificDate = '2020-12-20';

        const testIsCancelled = true;

        // Act
        const isCancelledSuccessfully = await appointmentHandler.cancelWorkerAppointments(workerId, specificDate);

        // Assert
        expect(isCancelledSuccessfully).toBe(testIsCancelled);
    });

})
