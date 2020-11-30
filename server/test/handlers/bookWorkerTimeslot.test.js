const workerTimeslotHandler = require('../../models/handlers/workerTimeslot');

describe('testing inputting of worker schedule functionality', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('valid parameter workerTimeslotId, expecting successful timeslot booking', async () => {
        // Arrange
        const workerTimeslotId = 5;

        const timeslotIsBooked = true;

        // Act
        const isCancelledSuccessfully = await workerTimeslotHandler.bookWorkerTimeslot(workerTimeslotId);

        // Assert
        expect(isCancelledSuccessfully).toBe(timeslotIsBooked);
    });

    test('valid parameter for different workerTimeslotId, expecting successful timeslot booking', async () => {
        // Arrange
        const workerTimeslotId = 7;

        const timeslotIsBooked = true;

        // Act
        const isCancelledSuccessfully = await workerTimeslotHandler.bookWorkerTimeslot(workerTimeslotId);

        // Assert
        expect(isCancelledSuccessfully).toBe(timeslotIsBooked);
    });

    test('invalid parameter for  workerTimeslotId, expecting error to be thrown', async () => {
        // Arrange
        const workerTimeslotId = 'hello_there_General_Kenobi';

        const timeslotIsBooked = false;

        // Act
        const isCancelledSuccessfully = await workerTimeslotHandler.bookWorkerTimeslot(workerTimeslotId);

        // Assert
        expect(isCancelledSuccessfully).toBe(timeslotIsBooked);
    });

});
