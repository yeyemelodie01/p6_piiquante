require('dotenv').config();         // load environment variables from the .env file into process.env
const express =         require('express');                 // import express: node.js web framework
const bodyParser =      require('body-parser');             // import body-parser: parse incoming request bodies in a middleware before handlers, available under the req.body property.
const mongoose =        require('mongoose');                // import mongoose: ODM, a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
const helmet =          require('helmet');                  // import helmet: help to secure Express apps by setting various HTTP headers.
const path =            require('path');                    // import path: provides a way of working with directories and file paths. (line 44)
const cors =            require('cors');                    // import cors: manage cross-origin resource sharing
const rateLimit =       require('express-rate-limit');      // comme son nom l'indique: on va fixer un taux limite pour les requêtes.

//constante à utiliser avec le package rateLimit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,       // = 15 minutes
    max: 100
})

// use express
const app = express();

app.use(limiter);

app.use(helmet());

app.use(cors({origin: 'http://localhost:'+process.env.BACK_END_SERVER_PORT}));

mongoose.connect('mongodb+srv://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_NAME,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// manage cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// cross-scripting protection (helmet)
app.use((req, res, next) => {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
});

// parsing all incoming requests
app.use(bodyParser.json());

const userRouter = require('./routes/user.routes');
app.use('/users', userRouter);

const authRouter = require('./routes/auth.routes')
app.use('/api/auth', authRouter);

const sauceRouter = require('./routes/sauce.routes')
app.use('/api/sauces', sauceRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
