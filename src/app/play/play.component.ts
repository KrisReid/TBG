import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';

@Component({
  selector: 'play',
  templateUrl: 'play.template.html'
})
export class PlayComponent {

  player = [{
    '_id': '58ab28eda757ea16ac3eb0ef',
    'fullName': 'Jamie Brookes'
  }]

  // jamie = '58ab28eda757ea16ac3eb0ef';
  // random = '58ab2c99a757ea16ac3eb0f9'
  // kris = '58ab2885a757ea16ac3eb0ed';

  maxTeamSize = 8;
  game = {} //individual game used for the editGame
  games = []; //all games in getGame
  nextAvailableGames = []; //games that are filetered by the getGamesIAmNotPlayingInLaterThanToday function

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
        this.games = data},
      error => {
        console.log(error)}
    );
  }

  getGamesIAmNotPlayingInLaterThanToday() {
    //empty the array
    this.nextAvailableGames = []

    for (let game of this.games) {

      let inReds = false;
      let inYellows = false;
      let inReserves = false;

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
      if (inReds == false && inYellows == false && inReserves == false && game.date > this.today){
        this.nextAvailableGames.push(game);
      }
      else {
        console.log("You are involved in all games later than today")
      }
    }
  }

  play(game) {
    this.allocatePlayer(game);
    this.editGame(game);
    setTimeout(1000);
    this.getGamesIAmNotPlayingInLaterThanToday();
  }

  editGame(game){
    this.gameService.editGame(game).subscribe(
      res => {
        this.game = game
      },
      error => console.log(error)
    );
  }

  allocatePlayer(game){
    let addedToReds = false;
    let addedToYellows = false;

    if(game.redTeam.length < this.maxTeamSize){
      game.redTeam.push(this.player[0]);
      addedToReds = true;
    }
    else if (addedToReds == false && game.yellowTeam.length <= this.maxTeamSize){
      game.yellowTeam.push(this.player[0]);
      addedToYellows = true;
    }
    else if (addedToReds == false && addedToYellows == false){
      game.reserves.push(this.player[0]);
    }
  }

}
