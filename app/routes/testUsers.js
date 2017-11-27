const express = require('express');

const getTestUserQuery = 'SELECT * FROM testUsers';
const findTestUserItem = 'SELECT * FROM testUsers WHERE id = ?;';
const removeFromTestUsersQuery = 'DELETE FROM testUsers WHERE id = ?';

class TestUsersHandler {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger || console;
    }

    getRouter() {
        const router = express.Router();
        router.get('/', this.getTestUsers.bind(this));
        router.post('/', this.saveToTestUsers.bind(this));
        router.post('/remove', this.removeFromTestUsersList.bind(this));
        return router;
    }

    getTestUsers(req, res) {
        this.logger.debug(
            { reqId: req.id },
            'trying to get testUsers from database'
        );

        this.db
            .query(getTestUserQuery)
            .then(testUsers => {
                this.logger.info('successfully fetched testUsers');
                res.json(testUsers);
            })
            .catch(err => {
                this.logger.error(err);
                res.sendStatus(500);
            });
    }

    saveToTestUsers(req, res) {
        const names = Object.keys(req.body);
        const values = names
            .reduce(
                (newArray, singleKey) =>
                    newArray.concat(`"${req.body[singleKey]}"`),
                []
            )
            .join(',');
        this.db
            .query(`INSERT IGNORE INTO testUsers (${names}) VALUES (${values});`)
            .then((result) => {
                this.db
                    .query(findTestUserItem, result.insertId)
                    .then(rows => {
                        if (rows) {
                            res.json(rows);
                        } else {
                            res.json([]);
                        }
                    });
            })
            .catch(err => {
                this.logger.info(err);
                res.sendStatus(500);
            });
    }

    removeFromTestUsersList(req, res) {
        this.db
            .query(removeFromTestUsersQuery, req.body.id)
            .then(() => {
                this.logger.info('item deleted from testUsers list');
                this.getTestUsers(req, res);
            })
            .catch(err => {
                this.logger.info(err);
                res.sendStatus(500);
            });
    }
}

module.exports = TestUsersHandler;
