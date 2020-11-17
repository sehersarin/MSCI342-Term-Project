const UserTypes = require('../../constants/userTypes.json');

class Student {
    // The password field will NOT be stored outside of the database for security purposes.
    constructor(studentData) {
        this.studentId = studentData.student_id;
        this.firstName = studentData.first_name;
        this.lastName = studentData.last_name;
        this.email = studentData.email;
        this.userType = UserTypes.student;
        this.accessToken = studentData.access_token;
        this.phone = studentData.phone;
        this.schoolId = studentData.school_id;
    }
}

module.exports = Student;