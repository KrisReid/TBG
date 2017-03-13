import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';

@Component({
  selector: 'play',
  templateUrl: 'play.template.html'
})
export class PlayComponent {

  playerId = '58ab2c99a757ea16ac3eb0f9';

  games = [];
  nextGames = [];
  loading = false;

  today = new Date().toISOString().slice(0,10);

  constructor(
    private router: Router,
    private gameService: GameService) { }

  ngOnInit() {
    this.getGamesLaterThanToday();
  }

  getGames() {
    this.loading = true;
    this.gameService.getGames().subscribe(
      data => {
        this.games = data
        this.loading = false; },
      error => {
        console.log(error)
        this.loading = false; }
    );
  }

  getGamesLaterThanToday() {
    //Get all the games
    this.getGames();
    //loop through the games and where the date is greater than today, push the game into the nextGames array
    //NEED TO ADD ANOTHER LOOP TO REMOVE GAME IF PLAYER IS ALREADY SIGNED UP
    for (let game of this.games) {
      if (game.date > this.today){
        this.nextGames.push(game);
      }
    }
    console.log(this.nextGames);
  }

  play(playerId, gameId) {
    console.log(playerId);
    console.log(gameId);
    //If Player exists
  }

}
