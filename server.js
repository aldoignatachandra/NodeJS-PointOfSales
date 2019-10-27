require ('dotenv/config');

//Dependencies
const express = require ('express');
const logger = require ('morgan');
const bodyParser = require ('body-parser');
const cors = require('cors')

const Router = require ('./src/Routes/index');

const server = express ();
const port = process.env.PORT;
const nodeEnv = 'Development';

//Public Allow CORS
server.use (cors());

server.listen (port , () => {
    console.log (`Server is running in port ${port} in ${nodeEnv} Mode....`);
});

server.use (logger ('dev'));
server.use (bodyParser.json ());
server.use (bodyParser.urlencoded ({extended: false}));

//Endpoint Router
server.use ('/api', Router);

module.exports = server;