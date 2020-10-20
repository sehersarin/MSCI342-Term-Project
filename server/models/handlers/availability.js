// Gets the time availabilities for a specific worker for a specific school.
async function getWorkerAvailability(workerId, schoolId) {
    const sampleAvailabileTimes = [
        {
            startTime: '08:00:00', 
            endTime: '08:30:00',
            date: '2020-10-20'
        },
        {
            startTime: '08:30:00', 
            endTime: '09:00:00',
            date: '2020-10-20'
        },
        {
            startTime: '09:00:00', 
            endTime: '09:30:00',
            date: '2020-10-20'
        }
    ];

    return sampleAvailabileTimes;
};

module.exports = {
    getWorkerAvailability,
}