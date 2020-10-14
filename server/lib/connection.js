// Sets up the connection to the database.
const pgpOptions = {};

const pgp = require('pg-promise')(pgpOptions);
const monitor = require('pg-monitor');

monitor.attach(pgpOptions);

const connectionString = process.env.DATABASE_URL;

const db = pgp(connectionString);

// Exports the database and connection string to be used in other files.
module.exports = { db, connectionString } 