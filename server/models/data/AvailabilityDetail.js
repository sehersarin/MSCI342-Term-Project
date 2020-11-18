class AvailabilityDetail {
    constructor(availabilityData) {
        this.schoolId = availabilityData.school_id;
        this.workerId = availabilityData.worker_id,
        this.startTime = availabilityData.start_time;
        this.endTime = availabilityData.end_time;
        this.date = availabilityData.date;
        this.workerTimeslotId = availabilityData.worker_timeslot_id;
    }
}

module.exports = AvailabilityDetail;