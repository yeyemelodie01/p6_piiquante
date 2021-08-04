const express = require('express');
const urlRoutes = express.Router();
const controller = require('../controllers/auth.controller');


urlRoutes.post('/signup', controller.signUpRequest);
urlRoutes.post('/login', controller.loginRequest);

module.exports = urlRoutes;
