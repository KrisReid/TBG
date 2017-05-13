import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CreditDebitComponent} from './credit-debit.component';
import {ContentFilterPipe} from './content-filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { ToastModule } from '../toast/toast.module';
import { ToastComponent } from '../toast/toast.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [CreditDebitComponent, ContentFilterPipe, ToastComponent],
  providers: [
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditDebitModule { }
