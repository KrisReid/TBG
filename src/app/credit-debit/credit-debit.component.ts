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
    let credit = this.credit
    let cred = Number(credit);
    player.debt += cred;
    
    console.log(player);

    this.playerService.updatePlayer(player).subscribe(
      res => {
        this.player = player;
      },
      error => console.log(error)
    );
  }

}
