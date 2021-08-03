const UserModel = require('../models/user.model');
exports.createOneRequest = async (req, res) => {
    const {email,password} = req.body;
    const foundUser = await UserModel.find({email,password});
    if(!foundUser || foundUser.length == 0) {
        const user = new UserModel({email,password});
        const response = await user.save();
        res.status(201).json(response);
    } else {
        res.status(409).json({message: "User already exists!"});
    }
}

exports.readOneRequest = async (req, res) => {
    const {email} = req.params;
    const foundUser = await UserModel.findOne({email: email});
    if(!foundUser || foundUser.length == 0) {
        res.status(404).json({message: "User not found!"});
    } else {
        res.status(302).json(foundUser);
    }
}
