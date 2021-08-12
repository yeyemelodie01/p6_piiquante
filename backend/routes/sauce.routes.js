const express = require('express');
const urlRoutes = express.Router();
const controller = require('../controllers/sauce.controller');
const upload = require('../middleware/upload');
const userAuth = require('../middleware/auth');


urlRoutes.get('/',userAuth, controller.sauceRequest);
urlRoutes.get('/:id', userAuth, controller.sauceIdRequest);
urlRoutes.post('/', userAuth, upload, controller.sauceAddRequest);
urlRoutes.put('/:id', userAuth, upload, controller.sauceUpdateRequest);
urlRoutes.delete('/:id',userAuth,  controller.sauceDeleteRequest);
urlRoutes.post('/:id/like',userAuth, controller.sauceLikeRequest);


module.exports = urlRoutes;
