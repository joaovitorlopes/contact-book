const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// Home routes
route.get('/', homeController.index);

// Login routes
route.get('/login', loginController.index);

module.exports = route;
