import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';

@Component({
  selector: 'play',
  templateUrl: 'play.template.html'
})
export class PlayComponent {

  playerId = '58ab2c99a757ea16ac3eb0f9';
  nextGame = '08/08/2017'

  today = Date.now();

  constructor(
    private router: Router) { }

}
