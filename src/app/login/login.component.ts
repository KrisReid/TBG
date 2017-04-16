import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserAuthService} from '../services/user-auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.styles.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    public authService: UserAuthService
  ) { }

  Signup() {
    console.log('Signup button hit')
    this.router.navigate(['/signup']);
  }

  login(userName: string) {
    this.authService.login(userName).then(() => {
      let redirectUrl = this.authService.redirectUrl
        ? this.authService.redirectUrl
        : '/';
      this.router.navigate([redirectUrl]);
    })
  }

  logout() {
    this.authService.logout().then(() => {
      //
    }) 
  }

}
