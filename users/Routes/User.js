const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user',
    },
    created: {
        type: String,
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
