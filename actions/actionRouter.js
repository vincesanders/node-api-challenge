const express = require('express');
const database = require('../data/helpers/actionModel');

const errorHandler = require('../utils/errorHandler');
const { validatePost } = require('../projects/projectRouter');

const router = express.Router();

router.get('/', (req, res) => {
    database.get().then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        errorHandler(err, 500, 'Could not get actions.')
    });
});

function validateActionId(req, res, next) {
    database.get(req.params.id).then(action => {
        if (!action) {
            res.status(400).json({ message: "invalid action id" });
        } else {
            req.action = action;
            next();
        }
    }).catch(err => {
        errorHandler(err, 500, "Could not get action. Check the action id.");
    })
}

module.exports = router;