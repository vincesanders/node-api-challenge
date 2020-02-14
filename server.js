const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { router } = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');
const projectRouter = router;

const server = express();

server.use(express.json(), cors(), logger, helmet());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.status(200).send(`<h1>Query this database for projects.</h1>`);
});

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`);
    next();
}

module.exports = server;