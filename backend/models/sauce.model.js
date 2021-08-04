const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    sauce: { type: String, required: true, unique: true},
    image: { : ima, required: true}
});

module.exports = mongoose.model('Sauces', sauceSchema);
