CREATE TABLE Student (
 student_id			INT NOT NULL,
 school_id			INT,
 first_name			VARCHAR(40),
 last_name			VARCHAR(40),
 email				VARCHAR(320),
 phone				VARCHAR(20),
 school_name 			VARCHAR(60),	

 PRIMARY KEY (student_id),

 FOREIGN KEY (school_id) REFERENCES High_School (school_id)
 ON UPDATE CASCADE ON DELETE CASCADE
);