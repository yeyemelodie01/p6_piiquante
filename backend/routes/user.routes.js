const express = require('express');
const urlRoutes = express.Router();

const controller = require('../controllers/user.controller');


urlRoutes.post('/', controller.createOneRequest);
urlRoutes.get('/:email', controller.readOneRequest);

module.exports = urlRoutes;
