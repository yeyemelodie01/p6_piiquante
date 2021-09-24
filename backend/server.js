require('dotenv').config();// charge les variables d'environnement du fichier .env
const express = require("express");// importation du module express
const path = require('path');// importation du module path
const helmet = require("helmet"); // importation du module helmet qui aide a sécuriser l'application express en définissant divers en-têtes HTTP
const mongoose = require("mongoose");// importation du module mongoose
const rateLimit = require("express-rate-limit"); //importation du module express rate limit qui permet de contrôler la vitesse à laquelle les demandes des utilisateurs sont traitées par notre serveur. Elle sécurise l'API

const limiter = rateLimit({ // constante limiter qui a pour valeur rateLimit
    windowMs : 15 * 60 * 1000,// 15 minutes
    max : 250, // 250 essaies
});

const app = express(); // utilisation du module express

app.use(limiter); // application de la constante limiter pour l'écoute maximum des requête

app.use(helmet());// application de helmet pour la protection des en-tête HTTP

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {// si "port" n'est pas un nombre
        return val; // renvoie l'argument val
    }
    if (port >= 0) { // si "port" plus grand ou égale à 0
        return port;// renvoie "port"
    }
    return false;// renvoie faux si port plus petit que 0
};

const port = normalizePort(process.env.BACK_END_SERVER_PORT || '3000'); // configuration du serveur pour qu'il écoute soit la variable d'environnement du port soit le port 3000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.use(express.json()); // Indique à l'application Express d'utiliser le middleware JSON (pour que nous puissions voir les corps de nos requêtes en JSON).

app.get('/', (req, res) => { // Crée une route GET qui envoie une réponse initiale.
    res.status(200).json({message: "Hello from my-express-app!"});
});


//MIDDLEWARE --- CORS ---
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // permet d'acceder a l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// ajoute les headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');// envoie des requêtes avec les méthodes mentionnées
    next();
});

//CONNECTION MONGOOSE
mongoose.connect('mongodb+srv://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_NAME,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // gère la ressource images de manière statique à chaque fois qu'elle reçoit une requête vers la route /uploads

const userRouter = require('./routes/user.routes'); //constante userRouter qui a pour valeur le chemin vers le fichier user.routes
app.use('/users', userRouter);

const authRouter = require('./routes/auth.routes')//constante userRouter qui a pour valeur le chemin vers le fichier auth.routes
app.use('/api/auth', authRouter);

const sauceRouter = require('./routes/sauce.routes')//constante userRouter qui a pour valeur le chemin vers le fichier sauce.routes
app.use('/api/sauces', sauceRouter);

module.exports = app;
