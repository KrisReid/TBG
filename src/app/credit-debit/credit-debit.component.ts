import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {PlayerService} from '../services/player.service';

import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'credit-debit',
  templateUrl: 'credit-debit.template.html',
  styleUrls: ['credit-debit.styles.css']
})
export class CreditDebitComponent implements OnInit {

  players = [];
  player = {};
  credit: 0;

  today = new Date();

  admin = [{
    '_id': '58ab2885a757ea16ac3eb0ed',
    'fullName': 'Kris Reid'
  }]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    public toast: ToastComponent,
  ) {  }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      data => this.players = data,
      error => console.log(error),
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

    console.log(typeof cred);

    if (cred > 0 || cred < 0){
      player.debtHistory.push(debtHistory);

      console.log(player);

      this.playerService.updatePlayer(player).subscribe(
        res => {
          this.player = player;
          this.toast.setMessage('Credit / Debit updated successfully', 'success');
        },
        error => console.log(error)
      );

      //this nulls the value after hitting update, meaning it can not be used for another entry
      this.credit = null;
    }
    else {
      console.log('No')
      this.toast.setMessage('No data has been populated', 'danger');
    }
  }

}
