// Create stub to input weekly worker schedule into database 
// Appointments occur at intervals of 30 minutes for each session for a 24 hour period Monday to Friday 
// Service worker must input their avability at each corresponding school for the week. This recurres for 4 weeks
//( int school_id_, int service_worker_id_, time[] start_times, string[] available, int[] days_available) 
// Days Available - Monday = 1; Tuesday = 2; Wednesday = 3; Thursday = 4; Friday = 5
//Output: Boolean Variable 
async function inputSchedule(schoolID, workerID, slotID, status, daysAvailable) {
    
  var did_it_work = false;
        //* insert (day, time, worker_id)
 var did_it_work = true;
        
 return did_it_work;
};

