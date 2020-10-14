// Configs the environment and imports required libraries.
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const postgrator = require('postgrator');

const app = express();

const api = require('./routes');
const { connectionString } = require('./lib/connection');

// Log failed requests to stderr
app.use(
    morgan('tiny', {
        skip: (req, res) => res.statusCode < 400,
        stream: process.stderr
    })
);

// Log successful requests to stderr
app.use(
    morgan('tiny', {
        skip: (req, res) => res.statusCode >= 400,
        stream: process.stdout
    })
);

// Ignore HTTP'ed requests if running in Heroku. Use HTTPS only.
if (process.env.DYNO) {
    app.enable('trust proxy')
    app.use((req, res, next) => {
        if (!req.secure) {
            if (req.path === '/') {
                res.redirect(301, `https://${req.host}/`);
            } else {
                res.status(400).end('Please switch to HTTPS.');
            }
        } else {
            return next();
        }
    })
}

// Connect all routes in the api.
app.use(api);

// Serve the react-ui in production mode.
if (process.env.NODE_ENV === 'production') {
    console.log(`Production mode detected: Serving react-ui`);
    const path = require('path');

    const buildDir = path.join(__dirname, '../react-ui/build');

    app.use(express.static(buildDir));

    app.get('*', (req, res) => {
        res.sendFile(path.join(buildDir, 'index.html'));
    })
}

// Initializes the migrations directory.
postgrator.setConfig({
    migrationDirectory: __dirname + '/migrations',
    driver: 'pg',
    connectionString
});

// Migrate database changes before listening for requests.
postgrator.migrate('max', (err, migrations) => {
    if (err) {
        console.error('Database migration failed!');
        console.error(err);
        process.exit(1);
    }

    postgrator.endConnection(() => {
        console.log('Database migrated successfully.');

        // Starts the server after successful database migration.
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server listening at ${port}`);
        });
    });
}) 