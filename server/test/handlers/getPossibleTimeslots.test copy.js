const appointmentHandler = require('../../models/handlers/timeslot');

describe('testing getting possible timeslots functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('initial setup of getting appointment details for a student', async() => {
        // Arrange
        const studentId = '12345678';
        const status = 'upcoming';
        const testAppointmentDetails = [
            {
                appointmentId: 1,
                worker: {
                    firstName: 'Tyler',
                    lastName: 'Evans',
                },
                date: '2020-11-05',
                startTime: '08:00:00',
                endTime: '08:30:00',
                status: 'upcoming',
            },
            {
                appointmentId: 2,
                worker: {
                    firstName: 'Joshua',
                    lastName: 'Brooks',
                },
                date: '2020-11-07',
                startTime: '08:30:00',
                endTime: '09:00:00',
                status: 'upcoming',
            },
        ];

        // Act
        const appointmentDetails = await appointmentHandler.getAppointmentDetailsForStudent(studentId, status);

        // Assert
        expect(appointmentDetails).toMatchObject(testAppointmentDetails);
    });

    test('initial setup of getting appointment details for a worker', async() => {
        // Arrange
        const workerId = '12345678';
        const status = 'upcoming';
        const testAppointmentDetails = [
            {
                appointmentId: 1,
                student: {
                    firstName: 'John',
                    lastName: 'Doe',
                },
                date: '2020-11-05',
                startTime: '08:00:00',
                endTime: '08:30:00',
                status: 'upcoming',
            },
            {
                appointmentId: 3,
                student: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                },
                date: '2020-11-05',
                startTime: '08:30:00',
                endTime: '09:00:00',
                status: 'upcoming',
            },
        ];

        // Act
        const appointmentDetails = await appointmentHandler.getAppointmentDetailsForWorker(workerId, status);

        // Assert
        expect(appointmentDetails).toMatchObject(testAppointmentDetails);
    });

}); 