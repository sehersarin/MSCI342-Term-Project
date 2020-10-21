class WorkerTimeslot {
    constructor(workerTimeslotData) {
        this.workerTimeslotId = workerTimeslotData.worker_timeslot_id;
        this.slotId = workerTimeslotData.slot_id;
        this.schoolId = workerTimeslotData.school_id;
        this.workerId = workerTimeslotData.worker_id;
        this.status = workerTimeslotData.status;
        this.date = workerTimeslotData.date;
    }
}

module.exports = WorkerTimeslot;