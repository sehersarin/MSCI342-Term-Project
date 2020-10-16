CREATE TABLE Appointment (
    appointment_id SERIAL NOT NULL,
    student_id INT NOT NULL,
    worker_timeslot_id INT NOT NULL, 
    purpose VARCHAR(300),
    student_notes VARCHAR(300),
    worker_comments VARCHAR(300),
    status VARCHAR(300),
    date_created TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (appointment_id),

    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (worker_timeslot_id) REFERENCES Worker_Timeslot(worker_timeslot_id) ON UPDATE CASCADE ON DELETE NO ACTION
);