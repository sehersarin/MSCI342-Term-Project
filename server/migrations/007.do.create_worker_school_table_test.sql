CREATE TABLE Service_Worker_School (
 school_id			INT NOT NULL,
 worker_id			INT NOT NULL,

 PRIMARY KEY (school_id, worker_id),

 FOREIGN KEY (school_id) REFERENCES High_School (school_id)
 ON UPDATE CASCADE ON DELETE CASCADE,
 FOREIGN KEY (worker_id) REFERENCES Service_Worker (worker_id)
 ON UPDATE CASCADE ON DELETE CASCADE
);