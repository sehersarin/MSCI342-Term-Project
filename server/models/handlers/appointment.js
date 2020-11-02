const appointmentModel = require('../db/appointment');

// Adds an appointment to the database and returns true upon successful completion.
async function bookAppointment(studentId, workerTimeslotId, purpose, studentNotes, workerComments) {
    try {
        await appointmentModel.insertAppointment(studentId, workerTimeslotId, purpose, studentNotes, workerComments);
        return true;
    } catch(error) {
        console.log('Error occurred in bookAppointment method: ', error);
        return false;
    }
};

// Fetches all the essential appointment details for a student and returns the appointmentId in case more information is desired.
// Note that only the minimal appointment details is returned to reduce the size of the payload (and avoid exceeding the payload size if the number of appointments increase).
async function getAppointmentDetailsForStudent(studentId, status) {
    const appointmentDetails = [
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

    return appointmentDetails;
}

// Fetches all the essential appointment details for a student and returns the appointmentId in case more information is desired.
// Note that only the minimal appointment details is returned to reduce the size of the payload (and avoid exceeding the payload size if the number of appointments increase).
async function getAppointmentDetailsForWorker(workerId, status) {
    const appointmentDetails = [
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

    return appointmentDetails;
}

module.exports = {
    bookAppointment,
    getAppointmentDetailsForStudent,
    getAppointmentDetailsForWorker,
}