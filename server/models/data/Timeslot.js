const UserTypes = require('../../constants/userTypes.json');

class Timeslot {
    // The password field will NOT be stored outside of the database for security purposes.
    constructor(timeslotData) {
        this.slotId = timeslotData.slot_id;
        this.startTime = timeslotData.start_time;
        this.endTime = timeslotData.end_time;
    }
}

module.exports = Timeslot;