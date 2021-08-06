const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModel = require('../models/user.model');
const jwt = require('njwt');

exports.signUpRequest = async (req, res) => {
    const {email, password} = req.body;
    const foundUser = await userModel.find({email});

    if(!foundUser || foundUser.length === 0) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const user = new userModel({
            email: email,
            password : hash
        });
        const response = await user.save();
        res.status(201).json(response);
    } else {
        res.status(409).json({message: "User already exists!"});
    }
}

exports.loginRequest = async (req, res) => {
    userModel.findOne({email: req.body.email})
        .then(user =>{
            if(!user){
                return res.status(409).json({message: "User not found"});
            }else {
                bcrypt.compare(req.body.password, user.password)
                    .then(userValid =>{
                        if (!userValid){
                            return res.status(409).json({message: "incorrect password"});
                        }else {
                            res.status(201).json({
                                userId: user._id,
                            })
                        }
                    })
            }
        })
}
