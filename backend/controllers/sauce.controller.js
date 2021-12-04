const sauceModel = require('../models/sauce.model');// importation du fichier sauce.model
const fs = require('fs'); // file système


exports.sauceRequest = async (req, res) => {// export de la fonction sauceRequest qui a pour fontion asynchrone qui a pour paramettre req et res
    sauceModel.find()//on exécute une fonction callback (find) pour récupéré tous les éléments présent dans le tableau sauceModel
        .then((sauce) => res.status(200).json(sauce))// reponse avec le statut 201 qui encode en json response
        .catch(error => res.status(400).json({ error }));// retourne une erreur avec la réponse de status 400 qui encode un json erreur
}

exports.sauceIdRequest = async (req, res) => {// export de la fonction sauceIdRequest qui a pour fontion asynchrone qui a pour parametre req et res
    sauceModel.findOne({ _id: req.params.id })// on exécute une fonction callback (findOne) pour récupéré un élément dans le tableau sauceModel grace a son id
        .then((sauce) => res.status(200).json(sauce))//gestion des données avec une reponse statut 200 qui encode une response json
        .catch(error => res.status(400).json({ error })); //retourne une erreur avec la réponse de status 400 qui encode un json erreur
}

exports.sauceAddRequest = async (req, res) => {// export de la fonction sauceAddRequest qui a pour fontion asynchrone qui a en parametre req et res
    const data = JSON.parse(req.body.sauce); // constante data qui a pour valeur json parse de req.body.sauce
    const dataSauce = await sauceModel.find({name:data.name});// constante dataSauce qui a pour valeur le résultat de sauceModel.find
    if(dataSauce.length > 0) {// si dataSauce.length(longueur de tableau ou collection) est plus grand que 0
        res.status(409).json({message: "sauce déja enregistrée"}); // reponse statut 409 qui encode un json message "sauce déja enregistré"
    }
    try {
        const sauce = new sauceModel({
            userId: data.userId,
            name: data.name,
            manufacturer: data.manufacturer,
            description: data.description,
            mainPepper: data.mainPepper,
            imageUrl:  `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,// url pour l'image req.protocol(http), req.get('host) pour l'hôte de serveur ici localhost:3000, uploads(dossier qui contiendra l'image), req.file.filename pour le nom du fichier
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
                ...req.body,//
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` // url pour l'image req.protocol(http), req.get('host) pour l'hôte de serveur ici localhost:3000, uploads(dossier qui contiendra l'image), req.file.filename pour le nom du fichier
            } : { ...req.body };//
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
    
            let likes = sauce.likes + 1;
            sauceModel.updateOne({_id: sauceId}, {$set: { likes : likes }})
                .catch(err=> res.status(404).json(err))
        }

    if(like === 0) {
        if (sauce.usersLiked.includes(userId)) {
            sauceModel.updateOne({_id: sauceId}, {$set: {usersLiked: sauce.usersLiked.filter(item => item !== userId)}})
                .catch(err => res.status(404).json(err))

            let likes = sauce.likes - 1;
            sauceModel.updateOne({_id: sauceId}, {$set: { likes : likes }})
                .catch(err=> res.status(404).json(err))
        }

        if (sauce.usersDisliked.includes(userId)) {
            sauceModel.updateOne({_id: sauceId}, {$set: {usersDisliked: sauce.usersDisliked.filter(item => item !== userId)}})
                .catch(err => res.status(404).json(err))
            let dislikes = sauce.dislikes - 1;
            sauceModel.updateOne({_id: sauceId}, {$set: { dislikes : dislikes }})
                .catch(err=> res.status(404).json(err))
        }
    }

        if(like === -1 && sauce.usersDisliked.includes(userId) === false){
            sauceModel.updateOne({_id: sauceId}, {$addToSet: { usersDisliked : [userId]}})
                .catch(err=> res.status(404).json(err))
            let dislikes = sauce.dislikes + 1;
            sauceModel.updateOne({_id: sauceId}, {$set: { dislikes : dislikes }})
                .catch(err=> res.status(404).json(err))
        }

    sauce = await sauceModel.findOne({_id: sauceId});
    res.status(200).json(sauce);
}
