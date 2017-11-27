const config = require('./config/');
const logger = require('./util/logger')(config);
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id');
const dbConnection = require('./util/dbconnection');
const TestUserHandler = require('./app/routes/testUsers');

const app = express();
app.use(bodyParser.json());
app.use(addRequestId());

dbConnection
    .setup(config)
    .then(db => {
        app.get('/status', function(req, res) {
            res.sendStatus(200);
        });

        const testUserRouter = new TestUserHandler(db, logger).getRouter();

        app.use('/v1/testUsers', testUserRouter);
        app.use(express.static(path.join(__dirname, 'public')));

        app.use((err, req, res) => {
            logger.error(err);
            res.sendStatus(500);
        });

        return startServer(app, config.get('port'));
    })
    .catch(err => {
        logger.error(err);
        process.exit(1);
    });

function startServer(server, port) {
    return new Promise((resolve, reject) => {
        server.listen(port, err => {
            if (err) {
                return reject(err);
            }
            logger.info(`Listening on port ${port}`);
            resolve();
        });
    });
}
