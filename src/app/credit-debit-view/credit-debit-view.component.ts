import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {PlayerService} from '../services/player.service';
import {UserAuthService} from '../services/user-auth.service';

@Component({
  selector: 'credit-debit-view',
  templateUrl: 'credit-debit-view.template.html',
  styleUrls: ['credit-debit-view.styles.css']
})
export class CreditDebitViewComponent {

  //Jon player signed in
  // player = {
  //   _id : "58d5a720a65377b3c55d4d38"
  // };

  player = {
    '_id': ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    public authService: UserAuthService,
  ) {  }

  ngOnInit() {
    // this.getPlayerById();
    this.getSignedInPlayerById()
  }

  // getPlayerById() {
  //   this.playerService.getPlayer(this.player._id).subscribe(
  //     res => {
  //       const player = res;
  //       this.player = player;
  //     },
  //     error => console.log(error),
  //   );
  // }

  getSignedInPlayerById() {
    let id = this.authService.player._id
    console.log(id)
    this.playerService.getPlayer(id).subscribe(
      res => {
        const player = res;
        this.player = player;
      },
      error => console.log(error),
    );
  }

}
