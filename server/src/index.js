'use strict';
const http = require('http');
require('dotenv').config()
const express = require('express');
const router = require('./router');
const errorHandler = require('./handleError/handler');

const PORT = process.env.PORT || 9999;
const app = express();
app.use(express.json());
app.use(router)
app.use(errorHandler)

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server is running on ${PORT} port`));