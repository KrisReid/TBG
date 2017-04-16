import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {LoginComponent} from './login.component';

import {UserAuthService} from '../services/user-auth.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [LoginComponent],
  providers: [UserAuthService]
})
export class LoginModule { }
