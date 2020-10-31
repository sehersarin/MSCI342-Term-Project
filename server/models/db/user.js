const _ = require('lodash');

const { db } = require('../../lib/connection');

const UserTypes = require('../../constants/userTypes.json');
const Tables = require('../../constants/tables.json');

// This method returns the corresponding user given the email and password. If the email and/or password are incorrect or undefined, it will return null. 
// If either the tableName or Object are null or undefined, an error will be thrown.
// Default values for the parameters not assigned as either student or worker user types are equally likely (prevent issues).
async function getUser(email, password, tableName, Object) {
    if (_.isNil(email) || _.isNil(password)) return null;
    if (_.isNil(tableName) || _.isNil(Object)) throw new Error('InvalidParametersError', 'Invalid parameters. Make sure to specify tablename and Object arguments when calling the getUser method.');
    
    const data = await db.any(`select * from ${tableName} where email='${email}' and password='${password}';`);

    if (_.isEmpty(data)) return null;

    return new Object(data[0]);
}

async function isValidUserAccessToken(accessToken, userType) {
    if (_.isNil(accessToken) || _.isNil(userType)) return false;

    const tableName = (userType === UserTypes.student) ? Tables.student : Tables.worker;

    const data = await db.any(`select * from ${tableName} where access_token='${accessToken}';`);

    if (_.isEmpty(data)) return false;

    return true;
}

module.exports = {
    getUser,
    isValidUserAccessToken,
}