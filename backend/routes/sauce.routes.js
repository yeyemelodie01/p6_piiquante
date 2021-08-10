const express = require('express');
const urlRoutes = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/sauce.controller');


urlRoutes.get('/', controller.sauceRequest);
urlRoutes.get('/:id', controller.sauceIdRequest);
urlRoutes.post('/', controller.sauceImgRequest);
urlRoutes.put('/:id', controller.sauceUpdateRequest);
urlRoutes.delete('/:id', controller.sauceDeleteRequest);
urlRoutes.post('/:id/like', controller.sauceLikeRequest);
urlRoutes.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});

module.exports = urlRoutes;
