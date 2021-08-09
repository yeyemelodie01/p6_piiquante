const multer = require ('multer');
const express = require("express");
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads');
    },
    filename: function (req, file, cb){
        const name = file.originalName.split(' ').join('_');
        cb(null, name + Date.now() + "--" + file.originalName);
    }
});

const fileFilter = (req, file, cb) => {
    if((file.mimeType).includes('jpeg') || (file.mimeType).includes('png') || (file.mimeType).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }
};

const upload = multer({storage: storage, fileFilter: fileFilter}).single('./uploads');

app.post("/uploads", upload.single("photo"), (req, res) =>
    res.json({
        success: true,
        blog: {
            photo: "/uploads/" + req.file.filename,
        },
    })
);
