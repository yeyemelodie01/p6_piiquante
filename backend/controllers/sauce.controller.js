exports.sauceRequest = async (req, res) => {
    res.status(200).json('Nom de la sauce');
    console.log('Nom de la sauce')
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
