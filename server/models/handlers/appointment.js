const _ = require('lodash');

const appointmentModel = require('../db/appointment');
const workerTimeslotModel = require('../db/workerTimeslot');

const AppointmentStatus = require('../../constants/appointmentStatus.json');
const TimeslotStatus = require('../../constants/timeslotStatus.json');

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

// Attempts to cancel all the worker appointments and updates their availability to unavailable for the entire day.
// Returns true if the worker appointments and their times were successfully updated and false if error encountered.
async function cancelWorkerAppointments(workerId, specificDate) {
    // If this method is somehow called without specifying values for the required parameters, false is returned.
    if (_.isNil(workerId) || _.isNil(specificDate)) return false;

    try {
        // Updates the worker's availability to unavailable for the entire day.
        const updateWorkerAvailability = workerTimeslotModel.updateWorkerAvailability(workerId, specificDate, TimeslotStatus.unavailable);
        // Cancels all of the worker's appointments on that day.
        const cancelWorkerAppointments = appointmentModel.cancelWorkerAppointments(workerId, specificDate);

        // Leverage Promise chain to complete both requests asynchronously and decrease execution time.
        await Promise.all([updateWorkerAvailability, cancelWorkerAppointments]);

        return true;
    } catch (error) {
        console.log('Error occurred in cancelWorkerAppointments method: ', error);
        return false;
    }
}

async function cancelSpecificAppointment(appointmentId) {
    // If this method is somehow called without specifying values for the required parameters, false is returned.
    if (_.isNil(appointmentId)) return false;
    try {
        const queryOutput = await appointmentModel.getAppointment(appointmentId);
        //Check if appt exists
        //const studentId = _.map(queryOutput, 'student_id');
        if (_.isEmpty(queryOutput)) return false;
        
        // Cancels specific appointment.
        const cancelSpecificAppointment = await appointmentModel.cancelSpecificAppointment(appointmentId);

        //Finds corresponding workerTimeslotId 
        const currentWorkerTimeslotId = _.map(queryOutput, 'worker_timeslot_id');
        const newStatus = TimeslotStatus.available;
        // Updates the worker's availability to available for the  timeslot of that specific appointment
        const updateWorkerAvailability = await workerTimeslotModel.updateIndividualWorkerAvailability(currentWorkerTimeslotId, newStatus);

        return true;
    } catch (error) {
        console.log('Error occurred in cancelSpecificAppointment method: ', error);
        return false;
    }

}

module.exports = {
    bookAppointment,
    getAppointmentDetails,
    cancelWorkerAppointments,
    cancelSpecificAppointment,
}