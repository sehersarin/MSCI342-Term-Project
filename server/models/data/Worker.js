const UserTypes = require('../../constants/userTypes.json');

class Worker {
    // The password field will NOT be stored outside of the database for security purposes.
    constructor(workerData) {
        this.workerId = workerData.worker_id;
        this.firstName = workerData.first_name;
        this.lastName = workerData.last_name;
        this.email = workerData.email;
        this.userType = UserTypes.worker;
        this.accessToken = workerData.access_token;
        this.phone = workerData.phone;
        this.specialization = workerData.specialization;
        this.type = workerData.type;
    }
}

module.exports = Worker;