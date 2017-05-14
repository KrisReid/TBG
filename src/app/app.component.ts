import { Component } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app',
  templateUrl: './app.template.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    public authService: UserAuthService,
  ) { }
}
