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

module.exports = router;