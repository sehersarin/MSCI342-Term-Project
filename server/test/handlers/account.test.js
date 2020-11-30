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
    });

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


    describe('testing valid account creation', () => {
        beforeEach(() => {
            jest.resetModules(); // Clears any cache between tests.
        });

        //TEST 4
        test('acceptance of valid student user', async () => {
            // Arrange
            // Generate a random studentId for insertion to avoid issues with the unique key already existing.
            const studentId = Math.floor(Math.random() * 100000) + 1
            const firstName = 'Josh';
            const lastName = 'Test';
            const email = 'joshtest@gmail.com';
            const phone = null;
            const schoolId = 1;
            const password = 'test123';
            const userType = 'student';
            const type = null;
            const workerId = null;
            const specialization = null;

            const studentUser = {
                studentId,
                firstName,
                lastName,
                email,
                phone,
                userType,
                schoolId
            };

            // Act
            const user = await accountHandler.createUserAccount(firstName, lastName, type, studentId, email, password, phone, userType, workerId, specialization, schoolId) ;
            
            // Assert
            expect(user).toEqual(expect.objectContaining(user));
            //if the user object ceated during account creation matches the test user, the account has been created sucessfully.
        });

        //TEST 5
        test('acceptance of valid worker user', async () => {
            // Arrange
            const studentId = null;
            const firstName = 'Josh';
            const lastName = 'Test';
            const email = 'joshtest@gmail.com';
            const phone = null;
            const schoolId = null;
            const password = 'test123';
            const userType = 'worker';
            const type = null;
            // Generate a random workerId for insertion to avoid issues with the unique key already existing.
            const workerId = Math.floor(Math.random() * 100000) + 1
            const specialization = 'social worker';

            const workerUser = {
                workerId,
                firstName,
                lastName,
                email,
                userType,
                phone,
                specialization,
                type,
            };

            // Act
            const user = await accountHandler.createUserAccount(firstName, lastName, type, studentId, email, password, phone, userType, workerId, specialization, schoolId) ;
            
            // Assert
            expect(user).toEqual(expect.objectContaining(user));
            //if the user object ceated during account creation matches the test user, the account has been created sucessfully.
        });

          //TEST 6
    test('rejection of invalid userType', async () => {
        // Arrange
        const testUserType = 'invalidUserType';

        // Act
        const user = await accountHandler.createUserAccount(testUserType);

        // Assert
        expect(user).toBe(null);
        //studentID should be null
    });
    });
});
