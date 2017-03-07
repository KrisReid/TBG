import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {PlayerService} from '../services/player.service';

@Component({
  selector: 'credit-debit',
  templateUrl: 'credit-debit.template.html',
  styleUrls: ['credit-debit.styles.css']
})
export class CreditDebitComponent {

  players = [];
  player = {};
  credit: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {  }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      data => this.players = data,
      error => console.log(error)
    );
  }

  Update(player) {
    console.log(typeof player.debt);
    console.log(typeof this.credit);
    player.debt = player.debt + this.credit;
    console.log(player);

    this.playerService.updatePlayer(player).subscribe(
      res => {
        this.player = player;
        this
      },
      error => console.log(error)
    );
  }

}
