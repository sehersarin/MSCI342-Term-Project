CREATE TABLE Student (
    student_id INT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email VARCHAR(320) NOT NULL,
    access_token VARCHAR(20) NOT NULL,
    password VARCHAR(40) NOT NULL,
    phone VARCHAR(20),
    school_id INT NOT NULL,

    PRIMARY KEY (student_id),

    FOREIGN KEY (school_id) REFERENCES School(school_id) ON UPDATE CASCADE ON DELETE CASCADE
);