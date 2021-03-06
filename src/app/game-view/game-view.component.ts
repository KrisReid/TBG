import {Component, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';
import { UserAuthService } from '../services/user-auth.service';
import { ToastrService } from 'toastr-ng2';

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
        private authService: UserAuthService,
        private toastrService: ToastrService
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

    deleteGame(game) {
      console.log("Button Deleted");
      this.gameService.deleteGame(game).subscribe(
        res => {
          const pos = this.games.map(elem => { return elem._id; }).indexOf(game._id);
          this.games.splice(pos, 1);
          this.toastrService.success('Game has been deleted', 'Success!');
        },
        error => console.log(error)
      );
    }


}
