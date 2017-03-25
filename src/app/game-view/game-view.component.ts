import {Component, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';

@Component({
    selector: 'gameview',
    templateUrl: 'game-view.template.html',
    styleUrls: ['game-view.styles.css']
})
export class GameViewComponent {

    games = [];

    constructor(
        private router: Router,
        private gameService: GameService
    ) {}

    ngOnInit() {
      this.getGames();
    }

    getGames() {
      this.gameService.getGames().subscribe(
        data => this.games = data,
        error => console.log(error)
      );
    }


}
