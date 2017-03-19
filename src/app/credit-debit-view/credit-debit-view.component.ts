import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {PlayerService} from '../services/player.service';

@Component({
  selector: 'credit-debit-view',
  templateUrl: 'credit-debit-view.template.html',
  styleUrls: ['credit-debit-view.styles.css']
})
export class CreditDebitViewComponent {

  //player signed in
  player = {
    _id : "58ce78beaf684a58f97cb1ff"
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {  }

  ngOnInit() {
    this.getPlayerById();
  }

  getPlayerById() {
    this.playerService.getPlayer(this.player._id).subscribe(
      res => {
        const player = res;
        this.player = player;
      },
      error => console.log(error),
    );
  }



}
