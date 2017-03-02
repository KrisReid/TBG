let mongoose = require('mongoose');

let gameSchema = mongoose.Schema({
    redTeam: Array,
    yellowTeam: Array,
    reserves: Array,
    date: String,
    location: String,
    startTime: String,
    finishTime: String
});

let Game = mongoose.model('Game', gameSchema);

module.exports = Game
