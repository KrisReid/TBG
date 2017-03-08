import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GameService} from '../services/game.service';

@Component({
  selector: 'play',
  templateUrl: 'play.template.html'
})
export class PlayComponent {

  playerId = 5
  nextGame = '08/08/2017'

  today = Date.now();

  constructor(
    private router: Router) { }

}
