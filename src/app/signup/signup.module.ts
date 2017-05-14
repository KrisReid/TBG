import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms'

import {SignupComponent} from './signup.component';

import { ToastComponent } from '../toast/toast.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignupComponent
  ],
  providers: [
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupModule { }
