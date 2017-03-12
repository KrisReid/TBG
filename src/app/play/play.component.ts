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

  today = Date.now();

  constructor(
    private router: Router,
    private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames().subscribe(
      data => this.games = data,
      error => console.log(error)
    );
  }

  identifyNextGame() {
    console.log(this.today);
    for (let game of this.games) {
      if (game.date > '2017-03-16'){
        return game
      }
      //IF the date is greater than today
      //THEN show the array in order of the games available
      console.log(game);
    }
  }

}
