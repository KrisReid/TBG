import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {PlayerService} from '../services/player.service';
import { UserAuthService } from '../services/user-auth.service';

import { ToastrService } from 'toastr-ng2';

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

  admin = {
    '_id': '',
    'fullName': ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private authService: UserAuthService,
    private toastrService: ToastrService
  ) {  }

  ngOnInit() {
    this.getSignedInPlayerById();
    this.getPlayers();
  }

  getSignedInPlayerById() {
    let id = this.authService.player._id
    this.playerService.getPlayer(id).subscribe(
      res => {
        const player = res;
        this.admin = player;
      },
      error => console.log(error),
    );
  }

  getPlayers() {
    this.playerService.getPlayers().subscribe(
      data => this.players = data,
      error => console.log(error),
    );
  }

  Update(player) {

    //Turn NaN into a 0 for later validation purposes
    let cred = 0;
    if (isNaN(this.credit)){
      this.credit = 0;
      cred = Number(this.credit);
    }
    else {
      cred = Number(this.credit);
    }

    //Update the player debt
    player.debt += cred;

    //Update the debt history
    let debtHistory = {
      date : this.today,
      amount : cred,
      who : this.admin.fullName
    }

    //If there is value in the input, then update the player with the latest values
    if (cred > 0 || cred < 0){
      player.debtHistory.push(debtHistory);

      console.log(player);

      this.playerService.updatePlayer(player).subscribe(
        res => {
          this.player = player;
          this.toastrService.success('Credit / Debit updated successfully', 'Success!');
        },
        error => console.log(error)
      );

      //This nulls the value after hitting update, meaning it can not be used for another entry
      this.credit = null;
    }
    //If it isn't a number then send the danger message
    else {
      this.toastrService.error('No data has been populated', 'Error!');
    }
  }

}
