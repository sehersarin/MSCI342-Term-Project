const timeslotHandler = require('../../models/handlers/Timeslot');

describe('testing getting possible timeslots functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('testing null parameters expecting full return of all records ', async () => {
        // Arrange
        const testTimeslotDetails = [
            {
                slotId: 1,
                startTime: '08:00:00',
                endTime: '08:30:00'
            },
            {
                slotId: 2,
                startTime: '08:30:00',
                endTime: '09:00:00'
            },
            {
                slotId: 3,
                startTime: '09:00:00',
                endTime: '09:30:00'
            },
            {
                slotId: 4,
                startTime: '09:30:00',
                endTime: '10:00:00'
            },
            {
                slotId: 5,
                startTime: '10:00:00',
                endTime: '10:30:00'
            },
            {
                slotId: 6,
                startTime: '10:30:00',
                endTime: '11:00:00'
            },
            {
                slotId: 7,
                startTime: '11:00:00',
                endTime: '11:30:00'
            },
            {
                slotId: 8,
                startTime: '11:30:00',
                endTime: '12:00:00'
            },
            {
                slotId: 9,
                startTime: '12:00:00',
                endTime: '12:30:00'
            },
            {
                slotId: 10,
                startTime: '12:30:00',
                endTime: '13:00:00'
            },
            {
                slotId: 11,
                startTime: '13:00:00',
                endTime: '13:30:00'
            },
            {
                slotId: 12,
                startTime: '13:30:00',
                endTime: '14:00:00'
            },
            {
                slotId: 13,
                startTime: '14:00:00',
                endTime: '14:30:00'
            },
            {
                slotId: 14,
                startTime: '14:30:00',
                endTime: '15:00:00'
            },
            {
                slotId: 15,
                startTime: '15:00:00',
                endTime: '15:30:00'
            },
        ];

        // Act
        const possibleTimeslots = await timeslotHandler.getPossibleTimeslots();

        // Assert
        expect(possibleTimeslots).toMatchObject(testTimeslotDetails);
    });
}); 
