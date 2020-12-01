const _ = require('lodash');

const appointmentModel = require('../db/appointment');

const AppointmentStatus = require('../../constants/appointmentStatus.json');

// Adds an appointment to the database and returns true upon successful completion.
async function bookAppointment(studentId, workerTimeslotId, purpose, studentNotes, workerComments) {
    try {
        await appointmentModel.insertAppointment(studentId, workerTimeslotId, purpose, studentNotes, workerComments);
        return true;
    } catch (error) {
        console.log('Error occurred in bookAppointment method: ', error);
        return false;
    }
};

// Fetches all the essential appointment details and returns the appointmentId in case more information is desired.
// Note that only the minimal appointment details is returned to reduce the size of the payload (and avoid exceeding the payload size if the number of appointments increase).
async function getAppointmentDetails(studentId, workerId, status) {
    // Defaults to returning the upcoming appointments if not specified.
    if (_.isEmpty(status)) status = `${AppointmentStatus.upcoming}`;

    return appointmentModel.getAppointmentDetails(studentId, workerId, status);
}

module.exports = {
    bookAppointment,
    getAppointmentDetails,
}