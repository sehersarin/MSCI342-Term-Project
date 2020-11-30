const workerTimeslotHandler = require('../../models/handlers/workerTimeslot');

describe('testing inputting of worker schedule functionality', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    //cancel specific day -> make sure not on 12-20 
    //lets choose workertimeslotId  and 7 for our testing 
    //what tests are we doing? 
    test('valid parameter workerTimeslotId, expecting successful timeslot booking', async () => {
        // Arrange
        const workerTimeslotId = 5;

        const timeslotIsBooked = true;

        // Act
        const isCancelledSuccessfully = await workerTimeslotHandler.timeslotModel.bookWorkerTimeslot(workerTimeslotId);

        // Assert
        expect(isCancelledSuccessfully).toBe(timeslotIsBooked);
    });

    test('valid parameter for different workerTimeslotId, expecting successful timeslot booking', async () => {
        // Arrange
        const workerTimeslotId = 7;

        const timeslotIsBooked = true;

        // Act
        const isCancelledSuccessfully = await workerTimeslotHandler.timeslotModel.bookWorkerTimeslot(workerTimeslotId);

        // Assert
        expect(isCancelledSuccessfully).toBe(timeslotIsBooked);
    });

});
