const timeslotModel = require('../../models/db/timeslot');

describe('testing parameters for insertWorkerTimeslot method', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('null value for all parameters', async () => {
        // Arrange
        const slotId = null;
        const schoolId = null;
        const workerId = null;
        const date = '2020-01-01';

        // Act
        const isTimelslotInserted = await timeslotModel.insertWorkerTimeslot(slotId, schoolId, workerId, date);

        // Assert
        expect(isTimelslotInserted).toBe(false);
    });

    test('valid sample values for all parameters', async () => {
        // Arrange
        const slotId = '1';
        const schoolId = '1';
        const workerId = '8000000';
        const date = '2020-11-27';
        

        // Act
        const isTimelslotInserted = await timeslotModel.insertWorkerTimeslot(slotId, schoolId, workerId, date);
        // Assert
        expect(isTimelslotInserted).toBe(true);
        


    });

    test('valid sample values for all parameters except one', async () => {
        // Arrange
        const slotId = '1';
        const schoolId = '27';
        const workerId = '8000000';
        const date = '2020-11-27';

        // Act
        const isTimelslotInserted = await timeslotModel.insertWorkerTimeslot(slotId, schoolId, workerId,date);

        // Assert
        expect(isTimelslotInserted).toBe(null);
    });

    

});