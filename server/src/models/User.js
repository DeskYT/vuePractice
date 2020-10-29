const mongoose = require('mongoose');
const connection = require('../db');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: mongoose.Schema.ObjectId,
    name: {
        type: String,
        allowNull: false,
        required: true,
    },
    group: {
        type: String,
        allowNull: false,
        required: true
    },
    age: {
        type: String,
        allowNull: false,
        required: true
    },
}, { timestamps: true });

const User = connection.model('User',userSchema);
module.exports = User;