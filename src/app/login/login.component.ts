import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.styles.css']
})
export class LoginComponent {

  constructor(
    private router: Router) { }

  Signup() {
    this.router.navigate(['/signup']);
  }

}
