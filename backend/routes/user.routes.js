const express = require('express');
const urlRoutes = express.Router();

const controller = require('../controllers/user.controller');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

urlRoutes.post('/', controller.createOneRequest);
urlRoutes.get('/:email', controller.readOneRequest);

module.exports = urlRoutes;
