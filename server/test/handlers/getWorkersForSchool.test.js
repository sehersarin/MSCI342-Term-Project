const schoolHandler = require('../../models/handlers/school');
const workerHandler = require('../../models/handlers/worker');

describe('testing user inputs schoolID ', () => {
    beforeEach(() => {
        jest.resetModules(); // Clears any cache between tests.
    });

    test('Initial setup for getting workers for the school', async () => {
        // Arrange
        const testSchoolId = '1';

        // Act
        const testWorkerObjects = [
            {
                workerId: 8000000,
                firstName: "Joshua",
                lastName: "Brooks",
                email: "joshuabrooks@gmail.com",
                userType: "worker",
                accessToken: "eeJAQr3wEC6CJZROFJTY",
                phone: "+15191234567",
                specialization: "Masters in Social Work",
                type: "Guidance Counselor"
            },
            {
                workerId: 8000001,
                firstName: "Carlos",
                lastName: "Smiths",
                email: "carlossmiths@gmail.com",
                userType: "worker",
                accessToken: "zV1Qnsx5VZKepGEFPAA3",
                phone: null,
                specialization: "Masters in Social Work",
                type: "Guidance Counselor"
            },
            {
                workerId: 8000002,
                firstName: "Tyler",
                lastName: "Evans",
                email: "tylerevans@gmail.com",
                userType: "worker",
                accessToken: "f1vkT2o7monUUzvPREHP",
                phone: null,
                specialization: "Masters in Social Work",
                type: "Social Worker"
            },
            {
                workerId: 8000003,
                firstName: "Kate",
                lastName: "Loven",
                email: "kateloven@gmail.com",
                userType: "worker",
                accessToken: "2OkQNaWyEZTU1JaEuBjh",
                phone: null,
                specialization: "Masters in Social Work",
                type: "Social Worker"
            },

        ];
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testSchoolId);
        const workerObjects = await workerHandler.getWorkersByWorkerIds(workerIds);

        // Assert
        expect(workerObjects).toMatchObject(testWorkerObjects);
    });


    test('Initial setup for getting schoolID for the worker', async () => {
        // Arrange
        const testSchoolId =[1];
        
        const testWorkerId = 8000000;

        // Act
        const schools = await workerHandler.getSchools(testWorkerId);

        // Assert
        expect(schools).toStrictEqual(testSchoolId);
    });

    //The following tests are for endpoint testing for the logic of the code 
    test('return of null for schoolId with no corresponding workers', async () => {
        //Arrange
        const testSchoolId = 5;

        // Act
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testSchoolId);
        const workerObjects = await workerHandler.getWorkersByWorkerIds(workerIds);

        // Assert
        expect(workerObjects).toBe(null);
    });

    test('return of error for invalid schoolId parameter', async () => {
        //Arrange
        const testSchoolId = 'hello there General Kenobi';

        // Act
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testSchoolId);
        const workerObjects = await workerHandler.getWorkersByWorkerIds(workerIds);

        // Assert
        expect(workerObjects).toBe(null);
    });

    test('return of error for invalid schoolId parameter', async () => {
        //Arrange
        const testSchoolId = null;

        // Act
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testSchoolId);
        const workerObjects = await workerHandler.getWorkersByWorkerIds(workerIds);

        // Assert
        expect(workerObjects).toBe(null);
    });

    test('return of error for invalid workerId parameter', async () => {
        //Arrange
        const testWorkerId = null;

        // Act
        const workerSchools = await workerHandler.getSchools(testWorkerId);

        // Assert
        expect(workerSchools).toBe(null);
    });     

    test('return of error for workerId with no school', async () => {
        //Arrange
        const testWorkerId = 8000004;

        // Act
        const workerSchools = await workerHandler.getSchools(testWorkerId);

        // Assert
        expect(workerSchools).toBe(null);
    });  
});
