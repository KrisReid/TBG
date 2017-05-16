import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserAuthService} from '../services/user-auth.service';
import {PlayerService} from '../services/player.service';

@Component({
  selector: 'login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.styles.css']
})
export class LoginComponent {



  player = {
    '_id': '',
    'admin': false,
    'password': '',
    'fullName': ''
  }

  email = ''
  enteredPassword = ''
  failedPassword = false;

  constructor(
    private router: Router,
    public authService: UserAuthService,
    public playerService: PlayerService,
  ) { }

  Signup() {
    this.router.navigate(['/signup']);
  }

  getPlayer(email) {
    this.playerService.getPlayerByEmail(email).subscribe(
      data => this.player = data,
      error => console.log(error),
    );
    setTimeout(2000);
  }

  login() {

    this.authService.player = this.player

    if(this.player._id != ''){
      if (this.player.password == this.enteredPassword) {
        if(this.player.admin === true) {
          this.failedPassword = false;
          this.authService.login('Admin').then(() => {
            let redirectUrl = this.authService.redirectUrl
              ? this.authService.redirectUrl
              : '/create';
            this.router.navigate([redirectUrl]);
          })
        }
        if (this.player.admin === false) {
          this.failedPassword = false;
          this.authService.login('User').then(() => {
            let redirectUrl = this.authService.redirectUrl
              ? this.authService.redirectUrl
              : '/play';
            this.router.navigate([redirectUrl]);
          })
        }
      }
      else {
        console.log("You do not exist or your password is a mis-match")
        this.failedPassword = true;
      }
    }
    else {
      console.log("No such player exists")
      this.failedPassword = true;
    }

  }

  logout() {
    this.authService.logout().then(() => {
    })
  }

}
