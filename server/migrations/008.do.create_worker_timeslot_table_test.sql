CREATE TABLE Worker_Timeslot (
 worker_timeslot_id		INT NOT NULL,
 slot_id 			INT NOT NULL,
 school_id			INT NOT NULL,
 worker_id			INT NOT NULL,
 status 				VARCHAR(30),
 date 				DATE,

 PRIMARY KEY (worker_timeslot_id),

 FOREIGN KEY (slot_id) REFERENCES Timeslot (slot_id)
 ON UPDATE CASCADE ON DELETE NO ACTION,
 FOREIGN KEY (school_id) REFERENCES Service_Worker_School (school_id)
 ON UPDATE CASCADE ON DELETE CASCADE,
 FOREIGN KEY (worker_id) REFERENCES Service_Worker_School (worker_id)
 ON UPDATE CASCADE ON DELETE CASCADE
 );
