require('dotenv').config();
const express = require("express");
const path = require('path');
const helmet = require("helmet");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 250,
});

const app = express();

app.use(limiter);

app.use(helmet());

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.BACK_END_SERVER_PORT || '3000'); // configuration du serveur pour qu'il écoute soit la variable d'environnement du port soit le port 3000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
app.use(express.json()); // Indique à l'application Express d'utiliser le middleware JSON (pour que nous puissions voir les corps de nos requêtes en JSON).

app.get('/', (req, res) => { // Crée une route GET et envoie une réponse initiale.
    res.status(200).json({message: "Hello from my-express-app!"});
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


mongoose.connect('mongodb+srv://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_NAME,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/uploads', express.static(path.join(__dirname,'uploads')));

const userRouter = require('./routes/user.routes');
app.use('/users', userRouter);

const authRouter = require('./routes/auth.routes')
app.use('/api/auth', authRouter);

const sauceRouter = require('./routes/sauce.routes')
app.use('/api/sauces', sauceRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
