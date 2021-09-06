const express = require("express"); //constante http qui donne accès a l'objet http qui permet de creer le serveur
const app = express();
const http = require('http');
//let cors = require('cors');

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
