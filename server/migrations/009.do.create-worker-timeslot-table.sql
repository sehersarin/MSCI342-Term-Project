CREATE TABLE Worker_Timeslot (
    worker_timeslot_id SERIAL NOT NULL,
    slot_id INT NOT NULL,
    school_id INT NOT NULL,
    worker_id INT NOT NULL,
    status VARCHAR(30),
    date DATE,

    PRIMARY KEY (worker_timeslot_id),
    
    FOREIGN KEY (slot_id) REFERENCES Timeslot (slot_id) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (school_id, worker_id) REFERENCES Service_Worker_School (school_id, worker_id) ON UPDATE CASCADE ON DELETE CASCADE
);