import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CreditDebitComponent} from './credit-debit.component';
import {ContentFilterPipe} from './content-filter.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ToastrService } from 'toastr-ng2';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    CreditDebitComponent,
    ContentFilterPipe,
  ],
  providers: [
    ToastrService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditDebitModule { }
