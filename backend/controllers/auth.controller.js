const bcrypt = require('bcrypt'); // importation du module bcrypt
const saltRounds = 10; // controle le temps necessaire pour calculer un seul hash
const userModel = require('../models/user.model'); // importation du fichier user.model
const jwt = require('jsonwebtoken'); // importation du module njwt

exports.signUpRequest = async (req, res) => { // export de la fonction signUpRequest avec pour valeur async parametre request et response
    const {email, password} = req.body; //constantes variables email et password extraites de request.body
    const foundUser = await userModel.find({email}); //constante foundUser avec pour valeur le résultat de userModel.find pour l'email

    if(!foundUser || foundUser.length === 0) { // si foundUser est faux ou si foundUser.length est strictement égale a 0
        const salt = bcrypt.genSaltSync(saltRounds); //constant salt qui contient le salt généré par bcrypt.genSaltSync
        const hash = bcrypt.hashSync(password, salt); // permet de masquer le mot de passe
        const user = new userModel({ // constante user avec pour valeur un nouvel objet de type userModel
            email: email, // email qui prend la valeur de l'email
            password : hash // le mot de passe qui sera hasher
        });
        const response = await user.save(); // constante response qui aura pour valeur le resultat de user.save
        res.status(201).json(response); // reponse avec le statut 201 qui encode en json response
    } else { //sinon
        res.status(409).json({message: "User already exists!"}); // reponse avec le statut 409 qui encode en json le message User already exists
    }
}

exports.loginRequest = async (req, res) => { // export de la fonction loginRequest avec pour valeur asynchrone qui a pour parametre req et res
    const {email, password} = req.body; //constantes variables email et password extraites de request.body
    const foundUser = await userModel.findOne({email}); //constante foundUser avec pour valeur le résultat de userModel.findOne pour l'email

    if(!foundUser || foundUser.length === 0) { // si foundUser est faux ou si foundUser.length est strictement égale a zero
        res.status(409).json({message: "User not found"}); // response avec le status 409 qui encode le message User not found
    }

    if (foundUser) { // si foundUser
        let checkPassword = bcrypt.compareSync(password, foundUser.password); // création de la variable checkPassword qui compare le mot de passe avec celui de foundUser.password
        if (checkPassword === true) { // si checkPassword est strictement vrai
            const token = jwt.sign(
                { userId: foundUser._id },
                process.env.SECRET,
                { expiresIn: '24h' }
            )

            const userLoginInformation = { // constante userLoginInformation
                userId: foundUser._id, // userId qui prend la valeur de foundUser._id
                token: token, //token qui prend la valeur de token.compact
            }
            res.status(302).json(userLoginInformation);// réponse avec le status 302 qui encode l'objet userLoginInformation
        } else {
            res.status(409).json({message: "User not found"}); // réponse avec le status 409 qui encode le message User not found
        }
    }
}
