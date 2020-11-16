const moment = require('moment');

class AvailabilityDetails {

    constructor(availabilityData) {
        this.schoolId = availabilityData.schoolId_id;
        // At any given time, either the worker or student will be null.
       // this.worker = availabilityData.worker_id,
        this.workerId= availabilityData.worker_id,
       // this.firstName= availabilityData.first_name,
       // this.lastName= availabilityData.last_name
       // this.date = moment(availabilityData.date).format('YYYY-MM-DD');
        this.startTime = availabilityData.start_time;
        this.endTime = availabilityData.end_time;
       // this.status = availabilityData.status;
    }
}

module.exports = AvailabilityDetails;