CREATE TABLE Priority_Notification_Worker (
 worker_priority_id 		INT NOT NULL,
 student_id			INT NOT NULL,
 worker_id	 		INT NOT NULL,
 date_before			DATE,

 PRIMARY KEY (worker_priority_id),
  
 FOREIGN KEY (student_id) REFERENCES Student (student_id)
 ON UPDATE CASCADE ON DELETE CASCADE,
 FOREIGN KEY (worker_id) REFERENCES Service_Worker (worker_id)
 ON UPDATE CASCADE ON DELETE NO ACTION
);
