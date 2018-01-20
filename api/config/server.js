const port = 3000;

const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./cors');

const server = express();

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json());
server.use(allowCors);

server.listen(port, function() {
    console.log(`API is running on port: ${port}`)
});

module.exports = server;
