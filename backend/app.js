require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_NAME,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json()); // Indique à l'application Express d'utiliser le middleware JSON (pour que nous puissions voir les corps de nos requêtes en JSON).

app.get('/', (req, res) => { // Crée une route GET et envoie une réponse initiale.
    res.status(200).json({message: "Hello from my-express-app!"});
});

const userRouter = require('./routes/user.routes');
app.use('/users', userRouter);

const authRouter = require('./routes/auth.routes')
app.use('/api/auth', authRouter);

const sauceRouter = require('./routes/sauce.routes')
app.use('/api/sauces', sauceRouter);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
