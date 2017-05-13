import {Component, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
    selector: 'gameview',
    templateUrl: 'game-view.template.html',
    styleUrls: ['game-view.styles.css']
})
export class GameViewComponent {

    games = [];

    constructor(
        private router: Router,
        private gameService: GameService,
        private authService: UserAuthService
    ) {}

    ngOnInit() {
      this.getGames();
    }

    getGames() {
      this.gameService.getGames().subscribe(
        data => this.games = data,
        error => console.log(error)
      );
      console.log(this.games)
    }


}
