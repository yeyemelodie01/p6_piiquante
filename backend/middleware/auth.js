const jwt = require('jsonwebtoken'); // importation du module jsonwebtoken

module.exports = (req, res, next) => { //
    try { //
        const token = req.headers.authorization.split(' ')[1]; // constante token qui permet de récupéré dans le headers autorization le token
        const decodedToken = jwt.verify(token, process.env.SECRET); // constante decodedToken qui permet de decoder le token
        const userId = decodedToken.userId; //
        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json({
                error: 'Invalid request!',
            });
        } else {
            next();
        }
    } catch {
        res.status(401).json({
                error: 'Invalid request!',
        });
    }
};
