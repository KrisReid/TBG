import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CreditDebitComponent} from './credit-debit.component';
import {ContentFilterPipe} from './content-filter.pipe';

import { ToastComponent } from '../toast/toast.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [CreditDebitComponent, ContentFilterPipe, ToastComponent],
  providers: [
    ToastComponent
  ],
})
export class CreditDebitModule { }
