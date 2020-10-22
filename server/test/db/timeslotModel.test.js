const timeslotModel = require('../../models/db/timeslot');
const moment= require('moment');

describe('testing parameters for insertWorkerTimeslot method', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('null value for all parameters', async () => {
        // Arrange
        const workerTimeslotId = null;
        const slotId = null;
        const schoolId = null;
        const workerId = null;
        const status = null;
        const date = null;

        // Act
        const isTimelslotInserted = await timeslotModel.insertWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date);

        // Assert
        expect(isTimelslotInserted).toBe(false);
    });

    test('valid sample values for all parameters', async () => {
        // Arrange
        const workerTimeslotId = '0050';
        const slotId = '0010';
        const schoolId = '1000';
        const workerId = '9100';
        const status = 'available';
        const date = new Date(2019, 5, 11, 5, 23, 59);

        // Act
        const isTimelslotInserted = await timeslotModel.insertWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date);

        // Assert
        expect(isTimelslotInserted).toBe(true);
    });

    test('valid sample values for all parameters except one', async () => {
        // Arrange
        const workerTimeslotId = null;
        const slotId = '0010';
        const schoolId = '1000';
        const workerId = '9100';
        const status = 'available';
        const date = new Date(2019, 5, 11, 5, 23, 59);

        // Act
        const isTimelslotInserted = await timeslotModel.insertWorkerTimeslot(workerTimeslotId, slotId, schoolId, workerId, status, date);

        // Assert
        expect(isTimelslotInserted).toBe(false);
    });

});