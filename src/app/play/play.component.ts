import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';

@Component({
  selector: 'play',
  templateUrl: 'play.template.html',
  styleUrls: ['play.styles.css']
})
export class PlayComponent {

  player = [{
    '_id': '58d5a5caaa81afb332a96642',
    'fullName': 'Jamie Brooks'
  }]

  maxTeamSize = 8;
  game = {} //individual game used for the editGame
  games = []; //all games in getGame
  nextAvailableGames = []; //games that are filetered by the getGamesIAmNotPlayingInLaterThanToday function
  gamesIAmIn = [];

  today = new Date().toISOString().slice(0,10);

  constructor(
    private router: Router,
    private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames().subscribe(
      data => {
        this.games = data,
        this.getGamesIAmNotPlayingInLaterThanToday(),
        this.getGamesIAmPlayingInLaterThanToday()
      },
      error => {
        console.log(error)}
    );
  }

  getGamesIAmNotPlayingInLaterThanToday() {

    console.log(this.games)
    //empty the array
    this.nextAvailableGames = []

    for (let game of this.games) {

      let inReds = false;
      let inYellows = false;
      let inReserves = false;

      if(game.date > this.today) {

        for (let reds of game.redTeam) {
          if (this.player[0]._id == reds._id){
            inReds = true;
            console.log("player already exists in the red team")
          }
        }
        for (let yellows of game.yellowTeam) {
          if (this.player[0]._id == yellows._id){
            inYellows = true;
            console.log("player already exists in the yellow team")
          }
        }
        for (let reserves of game.reserves) {
          if (this.player[0]._id == reserves._id){
            inReserves = true;
            console.log("player already exists as a reserve")
          }
        }
        if (inReds == false && inYellows == false && inReserves == false){
          this.nextAvailableGames.push(game);
        }
        else {
          console.log("You are already involved in this game")
        }

      }
      else {
        console.log("The game is before todays date")
      }
    }
  }

  play(game) {
    this.allocatePlayer(game);
    this.updateGame(game);
    setTimeout(1000);
    this.getGamesIAmNotPlayingInLaterThanToday();
    this.getGamesIAmPlayingInLaterThanToday();
  }

  updateGame(game){
    this.gameService.editGame(game).subscribe(
      res => {
        this.game = game
      },
      error => console.log(error)
    );
  }

  // Add the charging bit to this function
  allocatePlayer(game){
    let addedToReds = false;
    let addedToYellows = false;

    if(game.redTeam.length < this.maxTeamSize){
      game.redTeam.push(this.player[0]);
      addedToReds = true;
    }
    else if (addedToReds == false && game.yellowTeam.length < this.maxTeamSize){
      game.yellowTeam.push(this.player[0]);
      addedToYellows = true;
    }
    else if (addedToReds == false && addedToYellows == false){
      game.reserves.push(this.player[0]);
    }
  }


  getGamesIAmPlayingInLaterThanToday() {
    //empty the array
    this.gamesIAmIn = [];

    for (let game of this.games) {

      let inReds = false;
      let inYellows = false;
      let inReserves = false;

      if(game.date > this.today) {

        for (let reds of game.redTeam) {
          if (this.player[0]._id == reds._id){
            inReds = true;
            console.log("You are in the Red Team")
          }
        }
        for (let yellows of game.yellowTeam) {
          if (this.player[0]._id == yellows._id){
            inYellows = true;
            console.log("You are in the Yellow Team")
          }
        }
        for (let reserves of game.reserves) {
          if (this.player[0]._id == reserves._id){
            inReserves = true;
            console.log("You are a reserve")
          }
        }

        if (inReds == true || inYellows == true || inReserves == true){
          this.gamesIAmIn.push(game);
        }
        else {
          console.log("You are not signed up to a game yet")
        }

      }
      else {
        console.log("The game is before todays date")
      }


    }
  }

  dropOut(game) {
    this.removePlayerFromGame(game);
    this.updateGame(game);
    setTimeout(1000);
    this.getGamesIAmPlayingInLaterThanToday();
    this.getGamesIAmNotPlayingInLaterThanToday();
  }

  removePlayerFromGame(game){
    for (let reds of game.redTeam) {
      if (this.player[0]._id == reds._id){
        game.redTeam.pop(this.player[0]);
        console.log("Player removed from Red Team");
        //add a charge at this point?
        //IF THERE IS A PLAYER IN THE RESERVES THEN PROMOTE THEM TO THIS TEAM AND REMOVE THEM FROM THE RESERVES
        if (game.reserves.length > 0) {
          game.redTeam.push(game.reserves[0]);
          game.reserves.pop(game.reserves[0]);
        }
        else {
          console.log("There are no reserves to promote")
        }
      }
    }
    for (let yellows of game.yellowTeam) {
      if (this.player[0]._id == yellows._id){
        game.yellowTeam.pop(this.player[0]);
        console.log("Player removed from Yellow Team");
        //add a charge at this point?

        //IF THERE IS A PLAYER IN THE RESERVES THEN PROMOTE THEM TO THIS TEAM AND REMOVE THEM FROM THE RESERVES
        if (game.reserves.length > 0) {
          game.yellowTeam.push(game.reserves[0]);
          game.reserves.pop(game.reserves[0]);
        }
        else {
          console.log("There are no reserves to promote")
        }
      }
    }
    for (let reserves of game.reserves) {
      if (this.player[0]._id == reserves._id){
        game.reserves.pop(this.player[0]);
        console.log("Player removed from the reserves list");
        //add a charge at this point?
      }
    }
  }

}
