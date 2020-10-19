CREATE TABLE Appointment_Tags (
 appointment_id			INT NOT NULL,
 tag_id 				INT NOT NULL,

 PRIMARY KEY (appointment_id, tag_id),

 FOREIGN KEY (appointment_id) REFERENCES Appointment (appointment_id)
 ON UPDATE CASCADE ON DELETE CASCADE,
 FOREIGN KEY (tag_id) REFERENCES Tag (tag_id)
 ON UPDATE CASCADE ON DELETE NO ACTION
);
