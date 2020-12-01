const workerTimeslotHandler = require('../../models/handlers/workerTimeslot');

describe('Test to check expected returns of checkAvailability functionality ', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    ///TEST 1
    test('rejection of null workerTimeslotId', async () => {
        // Arrange
        // No test variables need to be initialized.
        const workerTimeslotId = null;

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(false);
    });

    //TEST 2
    test('rejection of an empty string value for workerTimeslotId', async () => {
        // Arrange
        const workerTimeslotId = '';

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(false);
    });

    //TEST 3
    test('rejection of an filled string value for workerTimeslotId', async () => {
        // Arrange
        const workerTimeslotId = 'good_day_sire';

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(false);
    });
    
    //TEST 4
    test('check valid workerTimeslotId for true return ', async () => {
        // Arrange
        const workerTimeslotId = 6;

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(true);
    });

    //TEST 5
    test('check valid workerTimeslotId for false return ', async () => {
        // Arrange
        const workerTimeslotId = 5;

        // Act
        const workerIsAvailable = await workerTimeslotHandler.checkWorkerAvailability(workerTimeslotId);

        // Assert
        expect(workerIsAvailable).toBe(false);
    });



});