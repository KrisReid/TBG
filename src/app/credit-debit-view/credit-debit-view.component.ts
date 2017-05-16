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
    this.getSignedInPlayerById()
  }

  getSignedInPlayerById() {
    let id = this.authService.player._id

    this.playerService.getPlayer(id).subscribe(
      res => {
        const player = res;
        this.player = player;
      },
      error => console.log(error),
    );
  }

}
