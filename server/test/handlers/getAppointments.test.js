const appointmentHandler = require('../../models/handlers/appointment');

describe('testing getting appointment details functionality', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('rejection of no parameters', async () => {
        // Arrange
        var isThrown = false;

        // Act
        try {
            const appointmentDetails = await appointmentHandler.getAppointmentDetails();
        } catch (err) {
            isThrown = true;
        }

        // Assert
        expect(isThrown).toBe(true);
    });

    test('all null values', async () => {
        // Arrange
        const studentId = null;
        const workerId = null;
        const status = null;

        // Act
        const appointmentDetails = await appointmentHandler.getAppointmentDetails(studentId, workerId, status);

        // Assert
        expect(appointmentDetails).toBe(null);
    });

    test('empty strings for optional status field', async () => {
        // Arrange
        const studentId = 12345678;
        const workerId = null;
        const status = '';

        // Act
        const appointmentDetails = await appointmentHandler.getAppointmentDetails(studentId, workerId, status);

        // Assert
        expect(appointmentDetails).toBeTruthy();
    });

    test('null values for optional status field', async () => {
        // Arrange
        const studentId = 12345678;
        const workerId = null;
        const status = null;

        // Act
        const appointmentDetails = await appointmentHandler.getAppointmentDetails(studentId, workerId, status);

        // Assert
        expect(appointmentDetails).toBeTruthy();
    });

    test('getting appointment details for a student', async () => {
        // Arrange
        const studentId = 12345678;
        const workerId = null;
        const status = 'upcoming';
        const testAppointmentDetail = {
            appointmentId: 3,
            worker: {
                workerId: 8000001,
                firstName: 'Carlos',
                lastName: 'Smiths'
            },
            student: null,
            date: '2020-11-22',
            startTime: '08:00:00',
            endTime: '08:30:00',
            status: 'upcoming'
        };

        // Act
        const appointmentDetails = await appointmentHandler.getAppointmentDetails(studentId, workerId, status);

        // Assert
        expect(appointmentDetails).toContainEqual(testAppointmentDetail);
    });

    test('getting appointment details for a student', async () => {
        // Arrange
        const studentId = null;
        const workerId = 8000000;
        const status = 'upcoming';
        const testAppointmentDetail = {
            appointmentId: 2,
            worker: null,
            student: {
                studentId: 12345679,
                firstName: 'Jane',
                lastName: 'Smith'
            },
            date: '2020-10-20',
            startTime: '08:30:00',
            endTime: '09:00:00',
            status: 'upcoming'
        };

        // Act
        const appointmentDetails = await appointmentHandler.getAppointmentDetails(studentId, workerId, status);

        // Assert
        expect(appointmentDetails).toContainEqual(testAppointmentDetail);
    });

}); 