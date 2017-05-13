import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ToastComponent } from '../toast/toast.component';

@NgModule({
  imports: [BrowserModule],
  // declarations: [ToastComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToastModule { }
