const moment = require('moment');

class AvailabilityDetails {

    constructor(availabilityData) {
        this.schoolId = availabilityData.school_id;
        this.workerId = availabilityData.worker_id,
        this.startTime = availabilityData.start_time;
        this.endTime = availabilityData.end_time;
    }
}

module.exports = AvailabilityDetails;