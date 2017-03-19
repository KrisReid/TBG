var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
// Local Test Mongo Database
// mongoose.connect('mongodb://localhost:27017/test');

// Online Test Mongo Database
mongoose.connect('mongodb://kris:kris@ds157839.mlab.com:57839/tnf/');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Player = require('./player.model.js');
var Game = require('./game.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  //Player API Calls
  app.get('/players', function(req, res) {
    Player.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  app.get('/player/:id', function(req, res) {
    Player.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  app.post('/players', function(req, res) {
    var obj = new Player(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  app.put('/player/:id', function(req, res) {
    Player.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  //Game API Calls
  app.get('/games', function(req, res) {
    Game.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  app.post('/games', function(req, res) {
    var obj = new Game(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  app.put('/game/:id', function(req, res) {
    Game.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });

  app.listen(app.get('port'), function() {
    console.log('TBG is listening on port '+app.get('port'));
  });

});

module.exports = app;
