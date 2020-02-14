const express = require('express');
const database = require('../data/helpers/actionModel');

const errorHandler = require('../utils/errorHandler');
const { validateAction } = require('../projects/projectRouter');

const router = express.Router();

router.get('/', (req, res) => {
    database.get().then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        errorHandler(err, 500, 'Could not get actions.')
    });
});

router.get('/:id', validateActionId, (req, res) => {
    //returns action
    res.status(200).json(req.action);
});

router.delete('/:id', validateActionId, (req, res) => {
    database.remove(req.params.id).then(numDeleted => {
        res.status(200).json(req.action);
    }).catch(err => {
        errorHandler(err, 500, "The action could not be removed");
    });
});

router.put('/:id', validateAction, validateActionId, (req, res) => {
    database.update(req.params.id, req.body).then(changedAction => {
        //returns changed action or null if not found
        if (!changedAction) {
            res.status(400).json({ message: "invalid action id" });
        } else {
            res.status(200).json(changedAction);
        }
    }).catch(err => {
        errorHandler(err, 500, "The action information could not be modified.");
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