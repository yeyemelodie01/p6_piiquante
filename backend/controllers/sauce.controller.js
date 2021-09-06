const sauceModel = require('../models/sauce.model');// importation du fichier sauce.model
const fs = require('fs'); // file système


exports.sauceRequest = async (req, res) => {// export de la fonction sauceRequest qui a pour valeur asynchrone qui a pour paramettre req et res
    sauceModel.find()//on exécute une fonction callback (find) pour récupéré tous les éléments présent dans le tableau sauceModel
        .then((sauce) => res.status(200).json(sauce))// reponse avec le statut 201 qui encode en json response
        .catch(error => res.status(400).json({ error }));// retourne une erreur avec la réponse de status 400 qui encode un json erreur
}

exports.sauceIdRequest = async (req, res) => {
    sauceModel.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
}

exports.sauceAddRequest = async (req, res) => {
    const data = JSON.parse(req.body.sauce);
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
            imageUrl:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
    const {userId, like} = req.body;
    const sauceId = req.params.id;
    let sauce = await sauceModel.findOne({_id: sauceId});

    if (like === 1 && sauce.usersLiked.includes(userId) === false) {
        sauceModel.updateOne({_id: sauceId},{$addToSet: { usersLiked : [userId]}})
            .catch(err => res.status(404).json(err))

        res.status(200).json("Ajout Reussi")
    }

    if(like === 0) {
        if (sauce.usersLiked.includes(userId)) {
            sauceModel.updateOne({_id: sauceId}, {$set: {usersLiked: sauce.usersLiked.filter(item => item !== userId)}})
                .catch(err => res.status(404).json(err))
            res.status(200).json("Suppression Réussi")
        }

        if (sauce.usersDisliked.includes(userId)) {
            sauceModel.updateOne({_id: sauceId}, {$set: {usersDisliked: sauce.usersDisliked.filter(item => item !== userId)}})
                .catch(err => res.status(404).json(err))
            res.status(200).json("Suppression Dislike Réussi")
        }
    }

    if(like === -1 && sauce.usersDisliked.includes(userId) === false){
        sauceModel.updateOne({_id: sauceId}, {$addToSet: { usersDisliked : [userId]}})
            .catch(err=> res.status(404).json(err))
        res.status(200).json("Ajout dislike Reussi")
    }

    res.status(200).json(sauce);
}
