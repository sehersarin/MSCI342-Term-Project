const _ = require('lodash');

const { db } = require('../../lib/connection');

const Tables = require('../../constants/tables.json');
const AppointmentStatus = require('../../constants/appointmentStatus.json');
const Worker = require('../data/Worker');
const { addWorkerTimeslot } = require('../handlers/timeslot');

//This method searches to see if a worker is available during the desired worker timeslot ID

async function getWorkerAvailability(workerId,slotId){
if (_.isNil(workerId) ) throw new Error('Please insert a valid Worker ID');
if (status='available')
    return userModel.getWorkerAvailability();
}
module.exports = {
    getWorkerAvailability,
}
