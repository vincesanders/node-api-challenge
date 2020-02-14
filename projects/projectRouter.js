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

router.get('/:id/actions', validateProjectId, (req, res) => {
    database.getProjectActions(req.params.id).then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        errorHandler(err, 500, "The projects's actions could not be retrieved");
    });
});

router.post('/', validateProject, (req, res) => {
    database.insert(req.body).then(project => {
        res.status(201).json(project);
    }).catch(err => {
        errorHandler(err, 500, 'Could not add project.');
    });
});

router.delete('/:id', validateProjectId, (req, res) => {
    database.remove(req.params.id).then(numDeleted => {
        res.status(200).json(req.project);
    }).catch(err => {
        errorHandler(err, 500, "The project could not be removed");
    });
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

function validateProject(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: "missing post data" });
    } else if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: "Please include name and description field." });
    } else {
        next();
    }
}

module.exports = router;