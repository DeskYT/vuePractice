const mongoose = require('mongoose');
const connection = require('../db');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: mongoose.Schema.ObjectId,
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = connection.model('User',userSchema);
module.exports = User;