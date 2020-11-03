const UserTypes = require('../../constants/userTypes.json');

class Timeslot {
    constructor(timeslotData) {
        this.slotId = timeslotData.slot_id;
        this.startTime = timeslotData.start_time;
        this.endTime = timeslotData.end_time;
    }
}

module.exports = Timeslot;