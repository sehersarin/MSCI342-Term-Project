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
/*
    test('rejection of null value for required schoolId parameter', async () => {
        // Arrange
        const testschoolId = null;

        // Act
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(workerIds).toStrictEqual(workerIds);
    });

    test('rejection of empty string value for required schoolId parameter', async () => {
        // Arrange
        const testschoolId = '';

        // Act
        workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        (workerIds).toStrictEqual(workerIds);
    });

    test('rejection of invalid school id', async () => {
        // Arrange
        const testschoolId = 0;

        // Act
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(workerIds).toStrictEqual(workerIds);
    });
});

describe('testing valid school ID parameters', () => {
    beforeEach(() => {
        //jest.resetModules(); // Clears any cache between tests.
    });

    test('empty strings for optional fields', async () => {
        // Arrange
        const testschoolId = 1;

        // Act
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(workerIds).toStrictEqual(workerIds);
    });

    test('null values for optional fields', async () => {
        // Arrange
        const testschoolId = 1;

        // Act
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(workerIds).toStrictEqual(workerIds);
    });

    test('only passing in values for required fields', async () => {
        // Arrange
        const testschoolId = 1;

        // Act
        const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);

        // Assert
        expect(workerIds).toStrictEqual(workerIds);
        //});

        test('passing in valid string values for required fields', async () => {
            // Arrange
            const testschoolId = "1";

            // Act
            const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);

            // Assert
            expect(workerIds).toStrictEqual(workerIds);
        });

        test ('passing in valid values for all fields', async () => {
            // Arrange
            const testschoolId = 1;

            // Act
            const workerIds = await schoolHandler.getWorkerIdsForSchool(testschoolId);

            // Assert
            expect(workerIds).toStrictEqual(workerIds);
        });
    });
    */
});
