// Create stub to input weekly worker schedule into database 
// Appointments occur at intervals of 30 minutes for each session for a 24 hour period Monday to Friday 
// Service worker must input their avability at each corresponding school for the week. This reoccurs for 4 weeks
// Days Available - Monday = 1; Tuesday = 2; Wednesday = 3; Thursday = 4; Friday = 5
//Input: School ID, Service Worker ID, Schedule with dates and times 
//Output: Boolean Variable 
async function addWorkerTimeslot(schoolID, workerID, slotID, status, daysAvailable) {
    
  var did_it_work = false;
        //* insert (day, time, worker_id)
  did_it_work = true;
        
  return did_it_work;
};

// Fetches all the essential timeslot details from timeslot table. 
//currently stub format 
async function getPossibleTimeslots() {
  const timeslotDetails = [
      {
          timeslotId: 1,
          startTime: '08:00:00',
          endTime: '08:30:00',
      },
      {
        timeslotId: 2,
        startTime: '09:00:00',
        endTime: '09:30:00',
    },
  ];

  return timeslotDetails;
}


module.exports = {
  addWorkerTimeslot,
  getPossibleTimeslots,
}
