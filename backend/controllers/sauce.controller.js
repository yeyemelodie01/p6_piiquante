const sauceModel = require('../models/sauce.model');
const fs = require('fs'); // file système


exports.sauceRequest = async (req, res) => {
    sauceModel.find()
        .then((sauce) => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
}

exports.sauceIdRequest = async (req, res) => {
    sauceModel.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
}

exports.sauceAddRequest = async (req, res) => {
    const data = req.body;
    const dataSauce = await sauceModel.find({name:data.name});
    if(dataSauce.length > 0) {
        res.status(409).json({message: "sauce déja enregistrée"});
    }
    try {
        const sauce = new sauceModel({
            userId: data.userId,
            name: data.name,
            manufacturer: data.manufacturer,
            description: data.description,
            mainPepper: data.mainPepper,
            imageUrl: data.imageUrl,
            heat: data.heat,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
        });
        sauce.save()
            .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
            .catch(error => res.status(400).json({error}));
    } catch (error) {
        res.status(400).json({error})
    }
}

exports.sauceUpdateRequest = async (req, res) => {
        const dataUpdate = req.file ? {
                ...req.body,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
            } : { ...req.body };
        sauceModel.updateOne({ _id: req.params.id }, { ...dataUpdate, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Mise a jour des informations'}))
            .catch(error => res.status(400).json({ error }));
}

exports.sauceDeleteRequest = async (req, res) => {
    sauceModel.findOne({ _id: req.params.id })
        .then(data => {
            const filename = data.imageUrl.split('/uploads/')[1];
            fs.unlink(`uploads/${filename}`, () => {
                sauceModel.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Image supprimée'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}

exports.sauceLikeRequest = async (req, res) => {

    res.status(200).json('Image aimée');
    console.log('login')
}


