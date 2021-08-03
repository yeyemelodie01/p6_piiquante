require('dotenv').config();
const express = require("express"); //constante http qui donne accès a l'objet http qui permet de creer le serveur
const app = express();

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

const userRouter = require('./routes/user.routes');
app.use('/users', userRouter);

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://melodieyeye:hMC6$T3ET3zn@bddproject.uiz3c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
