const bcrypt = require('bcrypt');
const user = require('../models/user.model');

exports.signUpRequest = async (req, res) => {
    // req.body est pour les demandes POST. Pensez au "corps du facteur".
    // déstructure la valeur du nom du corps de la requête.
    const {name} = req.body;

    // vérifier si la base de données contient déjà ce nom.
    const foundUser = await UserModel.find({name});

    // si aucun utilisateur n'est trouvé, nous pouvons ajouter cet utilisateur à la base de données.
    if (!foundUser || foundUser.length == 0) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new user({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(500).json({error}));
    }
}

exports.loginRequest = async (req, res) => {

    res.status(200).json('login');
    console.log('login')
}
