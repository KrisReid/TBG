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

  today = new Date();

  admin = [{
    '_id': '58ab2885a757ea16ac3eb0ed',
    'fullName': 'Kris Reid'
  }]

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

    let debtHistory = {
      date : this.today,
      amount : cred,
      who : this.admin[0].fullName
    }

    player.debtHistory.push(debtHistory);

    console.log(player);

    this.playerService.updatePlayer(player).subscribe(
      res => {
        this.player = player;
      },
      error => console.log(error)
    );

    console.log("TWAT")

    console.log(this.credit)
    this.credit = null
    console.log(this.credit)

  }

}
