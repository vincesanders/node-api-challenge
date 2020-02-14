const express = require('express');
const helmet = require('helmet');
const projectRouter = require('./projects/projectRouter');

const server = express();

server.use(express.json(), logger, helmet());

server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.status(200).send(`<h1>Query this database for projects.</h1>`);
});

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`);
    next();
}

module.exports = server;