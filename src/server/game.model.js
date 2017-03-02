let mongoose = require('mongoose');

let gameSchema = mongoose.Schema({
    redTeam: String,
    yellowTeam: String,
    reserves: String,
    date: String,
    location: String,
    startTime: String,
    finishTime: String
});

let Game = mongoose.model('Game', gameSchema);

module.exports = Game
