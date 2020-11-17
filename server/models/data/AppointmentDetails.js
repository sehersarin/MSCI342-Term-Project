const moment = require('moment');

class AppointmentDetails {
    // The password field will NOT be stored outside of the database for security purposes.
    constructor(appointmentData) {
        this.appointmentId = appointmentData.appointment_id;
        // At any given time, either the worker or student will be null.
        this.worker = appointmentData.worker_id ? {
            workerId: appointmentData.worker_id,
            firstName: appointmentData.first_name,
            lastName: appointmentData.last_name
        } : null; 
        this.student = appointmentData.student_id ? {
            studentId: appointmentData.student_id,
            firstName: appointmentData.first_name,
            lastName: appointmentData.last_name
        } : null;
        this.date = moment(appointmentData.date).format('YYYY-MM-DD');
        this.startTime = appointmentData.start_time;
        this.endTime = appointmentData.end_time;
        this.status = appointmentData.status;
    }
}

module.exports = AppointmentDetails;