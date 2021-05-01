const mongoose = require('mongoose');
//Create mongoose user model schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 1
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;