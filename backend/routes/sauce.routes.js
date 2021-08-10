const express = require('express');
const urlRoutes = express.Router();
const controller = require('../controllers/sauce.controller');
const upload = require('../middleware/upload');


urlRoutes.get('/', controller.sauceRequest);
urlRoutes.get('/:id', controller.sauceIdRequest);
urlRoutes.post('/', upload, controller.sauceImgRequest);
urlRoutes.put('/:id', upload, controller.sauceUpdateRequest);
urlRoutes.delete('/:id', controller.sauceDeleteRequest);
urlRoutes.post('/:id/like', controller.sauceLikeRequest);


module.exports = urlRoutes;
