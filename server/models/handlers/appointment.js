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

module.exports = {
    bookAppointment,
}