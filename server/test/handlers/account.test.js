const accountHandler = require('../../models/handlers/account');

describe('Test to check valid account creation', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    
    //Create a test using Arrange, Act, Assert format
    test('Initial set up: Checking if the account creation details are correct', async () => {
        // Arrange

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

        // Act
        const user = await accountHandler.createUserAccount(firstName, lastName, type, studentID, email, password, phone);

        // Assert
        expect(user).toMatchObject(testUser);

        //if the user object ceated during account creation matches the test user, the account has been created sucessfully.
    });



}); 