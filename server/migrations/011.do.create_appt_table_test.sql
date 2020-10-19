CREATE TABLE Appointment (
 appointment_id		INT NOT NULL,
 student_id			INT NOT NULL,
 worker_timeslot_id		INT NOT NULL,
 purpose 			VARCHAR(300),
 student_notes			VARCHAR(300),
 worker_comments		VARCHAR(300),
 status 				VARCHAR(20),
 date_created			DATETIME,
 date_updated			DATETIME,

 PRIMARY KEY (appointment_id),

 FOREIGN KEY (student_id) REFERENCES Student (student_id)
 ON UPDATE CASCADE ON DELETE CASCADE,
 FOREIGN KEY (worker_timeslot_id) REFERENCES Worker_Timeslot (worker_timeslot_id)
 ON UPDATE CASCADE ON DELETE NO ACTION
);
