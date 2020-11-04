const accountHandler = require('../../models/handlers/account');

describe('Test to check valid account creation', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    //TEST 1
    //Create a test using Arrange, Act, Assert format
    test('rejection of null values for studentID, firstName, lastName, email, type, phone, schoolId', async () => {
        // Arrange
        const testStudentId = null;
        const testFirstName = null;
        const testLastName = null;
        const testEmail = null;
        const testType = null;
        const testPhone = null;
        const testSchoolId = null;

        // Act
        const user = await accountHandler.createUserAccount(testStudentId, testFirstName, testLastName, testEmail, testType, testPhone, testSchoolId);

        // Assert
        expect(user).toBe(null);
        //all values should return null

    });
    //TEST 2
    test('rejection of empty values for studentID, firstName, lastName, email, phone, schoolId', async () => {
        // Arrange
        const testStudentId = '';
        const testFirstName = '';
        const testLastName = '';
        const testEmail = '';
        const testPhone = '';
        const testSchoolId = '';


        // Act
        const user = await accountHandler.createUserAccount(testStudentId, testFirstName, testLastName, testEmail, testPhone, testSchoolId);

        // Assert
        expect(user).toBe(null);
        //all values should return null

        //TEST 3
        test('rejection of invalid studentID', async () => {
            // Arrange
            const testStudentId = 'invalidstudent_id';


            // Act
            const user = await accountHandler.createUserAccount(testStudentId);

            // Assert
            expect(user).toBe(null);
            //studentID should be null
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
                    studentId: mystudent_id,
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'johndoe@gmail.com',
                    accessToken: 'XcCa92ZvOnQKZsGtOKOa',
                    phone: null,
                    schoolId: 1
                };

            // Act
            const user = await accountHandler.createUserAccount(mystudentId);
            // Assert
            expect(user).toMatchObject(studentUser);
             //if the user object ceated during account creation matches the test user, the account has been created sucessfully.
        });
//TEST 5
        test('acceptance of valid worker user', async () => {
            // Arrange
            const myworkerID = 8000000;
            const workerUser = {
                workerId: myworkerId,
                firstName: 'Joshua',
                lastName: 'Brooks',
                email: 'joshuabrooks@gmail.com',
                type: 'worker',
                accessToken: 'eeJAQr3wEC6CJZROFJTY',
                phone: '+15191234567',
                specialization: 'Masters in Social Work',
                type: 'Guidance Counselor'
            };

            // Act
            const user = await accountHandler.createUserAccount(myworkerId);


            // Assert
            expect(user).toMatchObject(workerUser);
             //if the user object ceated during account creation matches the test user, the account has been created sucessfully.
        });
    });


})
})
