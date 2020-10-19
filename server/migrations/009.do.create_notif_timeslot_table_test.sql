CREATE TABLE Priority_Notification_Timeslot (
 slot_priority_id 		INT NOT NULL,
 student_id			INT NOT NULL,
 slot_id	 			INT NOT NULL,
 date_before			DATE,

 PRIMARY KEY (slot_priority_id),
  
 FOREIGN KEY (student_id) REFERENCES Student (student_id)
 ON UPDATE CASCADE ON DELETE CASCADE,
 FOREIGN KEY (slot_id) REFERENCES Timeslot (slot_id)
 ON UPDATE CASCADE ON DELETE NO ACTION
);
