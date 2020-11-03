const accountHandler = require('../../models/handlers/account');

describe('Test to check valid account creation', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    //TEST 1
    //Create a test using Arrange, Act, Assert format
    test('rejection of null values for student_id, first_name, last_name, email, type, phone, school_id', async () => {
        // Arrange
        const testStudent_id = null;
        const testFirst_name = null;
        const testLast_name = null;
        const testEmail = null;
        const testType = null;
        const testPhone = null;
        const testSchool_id = null;

        // Act
        const user = await accountHandler.createUserAccount(testStudent_id, testFirst_name, testLast_name, testEmail, testType, testPhone, testSchool_id);

        // Assert
        expect(user).toBe(null);
        //all values should return null

    });
    //TEST 2
    test('rejection of empty values for student_id, first_name, last_name, email, type, phone, school_id', async () => {
        // Arrange
        const testStudent_id = '';
        const testFirst_name = '';
        const testLast_name = '';
        const testEmail = '';
        const testType = '';
        const testPhone = '';
        const testSchool_id = '';


        // Act
        const user = await authenticateHandler.createUserAccount(testStudent_id, testFirst_name, testLast_name, testEmail, testType, testPhone, testSchool_id);

        // Assert
        expect(user).toBe(null);
        //all values should return null

        //TEST 3
        test('rejection of invalid student_id', async () => {
            // Arrange
            const teststudent_id = 'invalidstudent_id';


            // Act
            const user = await accountHandler.createUserAccount(teststudent_id);

            // Assert
            expect(user).toBe(null);
            //student_id should be null
        });


        //TEST 4
        describe('testing valid account creation', () => {
            beforeEach(() => {
                jest.resetModules(); // Clears any cache between tests.
            });

            test('acceptance of valid student user', async () => {
                // Arrange
                const mystudent_id = '12345678';
                const studentUser = {
                    student_id: mystudent_id,
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com',
                    type: 'student',
                    access_token: 'XcCa92ZvOnQKZsGtOKOa',
                    phone: null,
                    school_id: 1
                };

            // Act
            const user = await accountHandler.createUserAccount(mystudent_id);
            // Assert
            expect(user).toMatchObject(studentUser);
             //if the user object ceated during account creation matches the test user, the account has been created sucessfully.
        });
//TEST 5
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
            const user = await accountHandler.createUserAccount(myworkerID);


            // Assert
            expect(user).toMatchObject(workerUser);
             //if the user object ceated during account creation matches the test user, the account has been created sucessfully.
        });
    });


})
})
