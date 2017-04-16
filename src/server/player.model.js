let mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    debt: Number,
    debtHistory: Array,
    terms: Boolean
});

let Player = mongoose.model('Player', playerSchema);

module.exports = Player
