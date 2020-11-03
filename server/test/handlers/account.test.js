const accountHandler = require('../../models/handlers/account');

describe('Test to check valid account creation', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    //Create a test using Arrange, Act, Assert format
    test('rejection of null values for StudentID', async () => {
        // Arrange

        const testStudentID = null;

        /* These are hard-coded values to test the stub.
        // In order to test, the tester should input these credentials
        const email = 'victorhugo@gmail.com';
        const password = 'victorlovespoetry';
        const first_name = 'Victor';
        const last_name = 'Hugo';
        const phone = '6476442200';
        const type = 'student';
        const studentID = '20764242';
        

        const testUser = {
            type: 'student', //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
            student_id: '20764242',
            firstname: 'Victor',
            lastname: 'Hugo',
            email: 'victorhugo@gmail.com',
            phone: '6476442200'
        };
*/

        // Act
        const user = await accountHandler.createUserAccount(first_name, last_name, type, studentID, email, password, phone, school_id);

        // Assert
        expect(user).toMatchObject(null);

        //if the user object ceated during account creation matches the test user, the account has been created sucessfully.


    });

    test('rejection of invalid StudentID', async () => {
        // Arrange
        const testStudentID = 'invalidStudentID';


        // Act
        const user = await accountHandler.createUserAccount(first_name, last_name, type, studentID, email, password, phone, school_id);


        // Assert
        expect(user).toBe(null);
    });



    describe('testing valid account creation', () => {
        beforeEach(() => {
            jest.resetModules(); // Clears any cache between tests.
        });

        test('acceptance of valid student user', async () => {
            // Arrange
            const mystudentID = '12345678';

            const studentUser = {
                    student_id: mystudentID ,
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com',
                    type: 'student',
                    access_token: 'XcCa92ZvOnQKZsGtOKOa',
                    phone: null,
                    school_id: 1
                };

            });

            // Act
            const user = await accountHandler.createUserAccount(first_name, last_name, type, student_id, email, password, phone,school_id);
            // Assert
            expect(user).toMatchObject(studentUser);
        });

        test('acceptance of valid worker user', async () => {
            // Arrange
            const myworkerID = 8000000;

            const workerUser = {
                worker_id: myworkerID,
                first_name: 'Joshua',
                last_name: 'Brooks',
                email: 'joshuabrooks@gmail.com',
                type: 'worker',
                access_token: 'eeJAQr3wEC6CJZROFJTY',
                phone: '+15191234567',
                specialization: 'Masters in Social Work',
                type: 'Guidance Counselor'
            };

            // Act
            const user = await accountHandler.createUserAccount(first_name, last_name, type, email, password, phone,worker_id,specialization);
           

            // Assert
            expect(user).toMatchObject(workerUser);
        });
    });


});
