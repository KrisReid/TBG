import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ReactiveFormsModule} from '@angular/forms'

import {SignupComponent} from './signup.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [SignupComponent],
})
export class SignupModule { }
