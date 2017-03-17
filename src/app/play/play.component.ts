import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';

@Component({
  selector: 'play',
  templateUrl: 'play.template.html'
})
export class PlayComponent {

  playerId = '58ab28eda757ea16ac3eb0ef';

  // jamie = '58ab28eda757ea16ac3eb0ef';
  // random = '58ab2c99a757ea16ac3eb0f9'
  // kris = '58ab2885a757ea16ac3eb0ed';

  games = [];
  nextAvailableGames = [];
  nextGames = [];
  loading = false;

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

  // getGamesLaterThanToday() {
  //   for (let game of this.games) {
  //     if (game.date > this.today){
  //       this.nextGames.push(game);
  //     }
  //   }
  //   console.log(this.nextGames);
  // }

  getGamesIAmNotPlayingInLaterThanToday() {

    //empty the array
    this.nextAvailableGames = []

    for (let game of this.games) {

      //populate the nextGames Array
      // if (game.date > this.today){
      //   this.nextGames.push(game);
      // }

      console.log(game.date)

      let inReds = false;
      let inYellows = false;
      let inReserves = false;

      for (let reds of game.redTeam) {
        if (this.playerId == reds._id){
          inReds = true;
          console.log("player already exists in the red team")
        }
      }
      for (let yellows of game.yellowTeam) {
        if (this.playerId == yellows._id){
          inYellows = true;
          console.log("player already exists in the yellow team")
        }
      }
      for (let reserves of game.reserves) {
        if (this.playerId == reserves._id){
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
    // console.log(this.nextGames);
  }

  play(playerId, gameId) {
    console.log(playerId);
    console.log(gameId);
    //If Player exists
  }

}
