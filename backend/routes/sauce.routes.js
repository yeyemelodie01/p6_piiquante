const express = require('express');
const urlRoutes = express.Router();

const controller = require('../controllers/sauce.controller');


urlRoutes.get('/', controller.sauceRequest);
urlRoutes.get('/:id', controller.sauceIdRequest);
urlRoutes.post('/', controller.sauceImgRequest);

module.exports = urlRoutes;
