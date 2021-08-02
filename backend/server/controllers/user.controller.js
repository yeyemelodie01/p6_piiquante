exports.createOneRequest = (req, res) => {
    res.status(201).json({message: "New resource created!"});
}

exports.readOneRequest = (req, res) => {
    res.status(302).json({message: "Resource found!"});
}

exports.updateOneRequest = (req, res) => {
    res.status(301).json({message: "Resource updated!"});
}

exports.deleteOneRequest = (req, res) => {
    res.status(202).json({message: "Resource deleted!"});
}
