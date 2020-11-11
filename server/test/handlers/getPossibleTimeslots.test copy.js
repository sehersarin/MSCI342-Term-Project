const workerTimeslotHandler = require('../models/handlers/workerTimeslot');

describe('testing getting possible timeslots functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('initial setup of getting appointment details for a student', async() => {
        // Arrange
        /*
        ('08:00:00', '08:30:00'), 
        ('08:30:00', '09:00:00'), 
        ('09:00:00', '09:30:00'), 
        ('09:30:00', '10:00:00'),
        ('10:00:00', '10:30:00'), 
        ('10:30:00', '11:00:00'), 
        ('11:00:00', '11:30:00'), 
        ('11:30:00', '12:00:00'), 
        ('12:00:00', '12:30:00'), 
        ('12:30:00', '13:00:00'), 
        ('13:00:00', '13:30:00'), 
        ('13:30:00', '14:00:00'),
        ('14:00:00', '14:30:00'), 
        ('14:30:00', '15:00:00'), 
        ('15:00:00', '15:30:00');
        */
        const testTimeslotDetails = [
            {
                timeslotId: 1,
                startTime: '08:00:00',
                endTime: '08:30:00'
            },
            {
                timeslotId: 2,
                startTime: '08:30:00',
                endTime: '09:00:00'
            },
            {
                timeslotId: 3,
                startTime: '09:00:00',
                endTime: '09:30:00'
            },
            {
                timeslotId: 4,
                startTime: '09:30:00',
                endTime: '10:00:00'
            },
            {
                timeslotId: 5,
                startTime: '10:00:00',
                endTime: '10:30:00'
            },
            {
                timeslotId: 6,
                startTime: '10:30:00',
                endTime: '11:00:00'
            },
            {
                timeslotId: 7,
                startTime: '11:00:00',
                endTime: '11:30:00'
            },
            {
                timeslotId: 8,
                startTime: '11:30:00',
                endTime: '12:00:00'
            },
            {
                timeslotId: 9,
                startTime: '12:00:00',
                endTime: '12:30:00'
            },
            {
                timeslotId: 10,
                startTime: '12:30:00',
                endTime: '13:00:00'
            },
            {
                timeslotId: 11,
                startTime: '13:00:00',
                endTime: '13:30:00'
            },
            {
                timeslotId: 12,
                startTime: '13:30:00',
                endTime: '14:00:00'
            },
            {
                timeslotId: 13,
                startTime: '14:00:00',
                endTime: '14:30:00'
            },
            {
                timeslotId: 14,
                startTime: '14:30:00',
                endTime: '15:00:00'
            },
            {
                timeslotId: 15,
                startTime: '15:00:00',
                endTime: '15:30:00'
            },
        ];

        // Act
        const possibleTimeslots = await appointmentHandler.getAppointmentDetailsForStudent(studentId, status);

        // Assert
        expect(possibleTimeslots).toMatchObject(testTimeslotDetails);
    });
/*
    test('initial setup of getting appointment details for a worker', async() => {
        // Arrange
        const workerId = '12345678';
        const status = 'upcoming';
    

        // Act
        const appointmentDetails = await appointmentHandler.getAppointmentDetailsForWorker(workerId, status);

        // Assert
        expect(appointmentDetails).toMatchObject(testAppointmentDetails);
    });
    */

}); 
