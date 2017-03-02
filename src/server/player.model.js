let mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    debt: Number,
    terms: Boolean
});

let Player = mongoose.model('Player', playerSchema);

module.exports = Player
