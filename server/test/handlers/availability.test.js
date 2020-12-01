const availabilityHandler = require('../../models/handlers/availability');

describe('testing fetching of worker availability functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('initial setup of worker availability fetching', async() => {
        // Arrange
        const workerId = 8000000;
        const schoolId = 1;
        const startTime = '2020-10-20';
        const endTime = '2020-10-20';

        const testAvailableTimes = [
            {
                workerTimeslotId: 1,
                startTime: '08:00:00', 
                endTime: '08:30:00',
                date: '2020-10-20'
            },
            {
                workerTimeslotId: 2,
                startTime: '08:30:00', 
                endTime: '09:00:00',
                date: '2020-10-20'
            },
            {
                workerTimeslotId: 3,
                startTime: '09:00:00', 
                endTime: '09:30:00',
                date: '2020-10-20'
            }
        ];

        // Act
        const availableTimes = await availabilityHandler.getWorkerAvailability(workerId, schoolId, startTime, endTime);

        // Assert
        expect(availableTimes).toMatchObject(testAvailableTimes);
    });

})