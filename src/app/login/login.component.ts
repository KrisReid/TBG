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
    admin: false
  }


  constructor(
    private router: Router,
    public authService: UserAuthService,
    public playerService: PlayerService
  ) { }

  Signup() {
    this.router.navigate(['/signup']);
  }

  getPlayer(email) {
    this.playerService.getPlayerByEmail(email).subscribe(
      data => this.player = data,
      error => console.log(error)
    );
    setTimeout(2000);
  }

  SignIn(email) {
    console.log(this.player)
    setTimeout(2000);

    if(this.player.admin === true) {
      this.authService.login('Admin').then(() => {
        let redirectUrl = this.authService.redirectUrl
          ? this.authService.redirectUrl
          : '/create';
        this.router.navigate([redirectUrl]);
      })
      this.authService.player = this.player
    }
    if (this.player.admin === false) {
      this.authService.login('User').then(() => {
        let redirectUrl = this.authService.redirectUrl
          ? this.authService.redirectUrl
          : '/play';
        this.router.navigate([redirectUrl]);
      })
    }
  }

  // login(userName: string) {
  //   this.authService.login(userName).then(() => {
  //     let redirectUrl = this.authService.redirectUrl
  //       ? this.authService.redirectUrl
  //       : '/';
  //     this.router.navigate([redirectUrl]);
  //   })
  // }

  logout() {
    this.authService.logout().then(() => {
      //
    })
  }

}
