const accountHandler = require('../../models/handlers/account');

describe('Test to check valid account creation', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    
    //Create a test using Arrange, Act, Assert format
    test('rejection of null values for StudentID', async () => {
        // Arrange

        const testStudentID = null;
        /*
        // In order to test, the tester should input these credentials
        const email = 'victorhugo@gmail.com';
        const password = 'victorlovespoetry';
        const firstName = 'Victor';
        const lastName = 'Hugo';
        const phone = '6476442200';
        const type = 'student';
        const studentID = '20764242';
        

        const testUser = {
            type: 'student', //note: 'type' is called 'role' in the UI, but refers to either a worker or a student.
            studentId: '20764242',
            firstname: 'Victor',
            lastname: 'Hugo',
            email: 'victorhugo@gmail.com',
            phone: '6476442200'
        };
*/

        // Act
        const user = await accountHandler.createUserAccount(firstName, lastName, type, studentID, email, password, phone, school_id );

        // Assert
        expect(user).toMatchObject(null);

        //if the user object ceated during account creation matches the test user, the account has been created sucessfully.
    });



    test('rejection of invalid StudentID', async () => {
        // Arrange
        const testStudentID = 'invalidStudentID';
    

        // Act
        const user = await accountHandler.createUserAccount(firstName, lastName, type, studentID, email, password, phone, school_id );


        // Assert
        expect(user).toBe(null);
    });

    

describe('testing valid account creation', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('acceptance of valid student user', async () => {
        // Arrange
        const mystudentID = '20764242';
        const studentUser = {
        const email = 'victorhugo@gmail.com';
        const password = 'victorlovespoetry';
        const firstName = 'Victor';
        const lastName = 'Hugo';
        const phone = '6476442200';
        const type = 'student';
        const studentID = mystudentID;
        schoolId: 1
            
        };

        // Act
        const user = await accountHandler.createUserAccount(firstName, lastName, type, studentID, email, password, phone, school_id );
        // Assert
        expect(user).toMatchObject(studentUser);
    });

    test('acceptance of valid worker user', async () => {
        // Arrange
        const myworkerID = 66449055;
        
        const workerUser = {
            workerId: myworkerID,
            firstName: 'Flora',
            lastName: 'Gardener',
            email: 'floralovesflowers@gmail.com',
            type: 'worker',
            phone: '15191234567',
            specialization: 'Masters in Social Work',
            type: 'Guidance Counselor'
        };

        // Act
        const user = await accountHandler.createUserAccount(firstName, lastName, type, studentID, email, password, phone, school_id );

        // Assert
        expect(user).toMatchObject(workerUser);
    });
});


    });
