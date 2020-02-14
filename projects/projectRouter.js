const express = require('express');
const database = require('../data/helpers/projectModel');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

router.get('/', (req, res) => {
    database.get().then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        errorHandler(err, 500, 'Could not get projects.')
    });
});

router.get('/:id', validateProjectId, (req, res) => {
    //returns project AND all actions
    res.status(200).json(req.project);
});

function validateProjectId(req, res, next) {
    database.get(req.params.id).then(project => {
        if (!project) {
            res.status(400).json({ message: "invalid project id" });
        } else {
        req.project = project;
        next();
        }
    }).catch(err => {
        errorHandler(err, 500, "The project information could not be retrieved.");
    });
}

module.exports = router;