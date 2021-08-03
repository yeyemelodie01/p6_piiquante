const mongoose = require('mongoose');

const UserModel = mongoose.model('User',
    mongoose.Schema(
        {
            name: {
                type: String
            },
        },
        {timestamps: true}
    )
);

module.exports = UserModel;
