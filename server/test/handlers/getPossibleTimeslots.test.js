const timeslotHandler = require('../../models/handlers/Timeslot');

describe('testing getting possible timeslots functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('testing null parameters expecting full return of all records ', async () => {
        // Arrange
        const testTimeslotDetails = [
            {
                slot_id: 1,
                start_time: '08:00:00',
                end_time: '08:30:00'
            },
            {
                slot_id: 2,
                start_time: '08:30:00',
                end_time: '09:00:00'
            },
            {
                slot_id: 3,
                start_time: '09:00:00',
                end_time: '09:30:00'
            },
            {
                slot_id: 4,
                start_time: '09:30:00',
                end_time: '10:00:00'
            },
            {
                slot_id: 5,
                start_time: '10:00:00',
                end_time: '10:30:00'
            },
            {
                slot_id: 6,
                start_time: '10:30:00',
                end_time: '11:00:00'
            },
            {
                slot_id: 7,
                start_time: '11:00:00',
                end_time: '11:30:00'
            },
            {
                slot_id: 8,
                start_time: '11:30:00',
                end_time: '12:00:00'
            },
            {
                slot_id: 9,
                start_time: '12:00:00',
                end_time: '12:30:00'
            },
            {
                slot_id: 10,
                start_time: '12:30:00',
                end_time: '13:00:00'
            },
            {
                slot_id: 11,
                start_time: '13:00:00',
                end_time: '13:30:00'
            },
            {
                slot_id: 12,
                start_time: '13:30:00',
                end_time: '14:00:00'
            },
            {
                slot_id: 13,
                start_time: '14:00:00',
                end_time: '14:30:00'
            },
            {
                slot_id: 14,
                start_time: '14:30:00',
                end_time: '15:00:00'
            },
            {
                slot_id: 15,
                start_time: '15:00:00',
                end_time: '15:30:00'
            },
        ];

        // Act
        const possibleTimeslots = await timeslotHandler.getPossibleTimeslots();

        // Assert
        expect(possibleTimeslots).toMatchObject(testTimeslotDetails);
    });


    test('testing specified time parameters expecting a return', async () => {
        // Arrange
        const testTimeslotDetails = [
            {
                slot_id: 5,
                start_time: '10:00:00',
                end_time: '10:30:00'
            },
            {
                slot_id: 6,
                start_time: '10:30:00',
                end_time: '11:00:00'
            },
            {
                slot_id: 7,
                start_time: '11:00:00',
                end_time: '11:30:00'
            },
            {
                slot_id: 8,
                start_time: '11:30:00',
                end_time: '12:00:00'
            },
        ];

        // Act
        const possibleTimeslots = await timeslotHandler.getPossibleTimeslots('10:00:00', '12:00:00');

        // Assert
        expect(possibleTimeslots).toMatchObject(testTimeslotDetails);
    });

    test('testing specified time parameters expecting null return ', async () => {
        // Arrange
        const testTimeslotDetails = [
        ];

        // Act
        const possibleTimeslots = await timeslotHandler.getPossibleTimeslots('16:00:00', '17:00:00');

        // Assert
        expect(possibleTimeslots).toMatchObject(testTimeslotDetails);
    });

}); 
