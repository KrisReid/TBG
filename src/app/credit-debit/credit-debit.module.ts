import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CreditDebitComponent} from './credit-debit.component';
import {ContentFilterPipe} from './content-filter.pipe';

@NgModule({
  imports: [BrowserModule],
  declarations: [CreditDebitComponent, ContentFilterPipe],
})
export class CreditDebitModule { }
