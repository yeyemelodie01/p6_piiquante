const express = require('express'); // Importe l'API Express afin que nous puissions utiliser ses fonctionnalités dans notre application.

const app = express(); // Construit une nouvelle application Express qui fonctionne comme notre serveur.

app.use(express.json()); // Indique à l'application Express d'utiliser le middleware JSON (pour que nous puissions voir les corps de nos requêtes en JSON).

app.get('/', (req, res) => { // Crée une route GET et envoie une réponse initiale.
    res.status(200).json({message: "Hello from my-express-app!"});
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

const userRouter = require('./routes/user.routes');

const userController = require('.controllers/user.controller');

app.use('/users', userRouter);
app.use('/users', userController);
