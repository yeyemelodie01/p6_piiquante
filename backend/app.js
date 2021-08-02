// importation du framework express
const express = require('express');

//importation de mongoose
const mongoose = require('mongoose');

//creation d'une constante qui sera notre application
const app = express();


//connection mongoose vers notre app
mongoose.connect('mongodb+srv://melodieyeye:hMC6$T3ET3zn@bddproject.uiz3c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//----Middleware-----
// ------CORS----- cela permet a lappli d'acceder a l'API sans probleme
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;
