//const sauceModel = require('../models/sauce.model');
const multer = require('multer');

exports.sauceRequest = async (req, res) => {
    //const sauceUser = await sauceModel.find({userId});
    res.status(200).json('Nom de la sauce');
}

exports.sauceIdRequest = async (req, res) => {

    res.status(200).json('Voici mon id: 123456789');
    console.log('login')
}

exports.sauceImgRequest = async (req, res) => {

    res.status(200).json('Image ajoutée');
    console.log('login')
}

exports.sauceUpdateRequest = async (req, res) => {

    res.status(200).json('Mise a jour des informations');
    console.log('login')
}

exports.sauceDeleteRequest = async (req, res) => {

    res.status(200).json('Image supprimée');
    console.log('login')
}

exports.sauceLikeRequest = async (req, res) => {

    res.status(200).json('Image aimée');
    console.log('login')
}

exports.updateAnUserImage = async (req, res) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "--" + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
            cb(null, true);
        } else{
            cb(null, false);
        }

    };

    let upload = multer({ storage: storage, fileFilter: fileFilter,});

    export default upload.single('ProfilePicture')
}

