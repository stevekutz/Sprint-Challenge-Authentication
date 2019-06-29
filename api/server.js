const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);


server.get('/', (req, res) => {
    res.cookie('TestCookie', 'myTestCookie!!!!');
 //   res.status(201).json({message: `Sanity Check works!!!`});
    // OR
    res.send(`<h3> Sanity check HTML </h3>`);

});



module.exports = server;
