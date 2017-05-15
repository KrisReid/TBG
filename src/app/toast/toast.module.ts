import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastComponent } from '../toast/toast.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [ToastComponent],
  providers: [ToastComponent]
})

export class ToastModule { }
