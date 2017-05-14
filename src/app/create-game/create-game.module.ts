import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CreateGameComponent } from './create-game.component';

import { ToastrService } from 'toastr-ng2';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [CreateGameComponent],
  providers: [
    ToastrService
  ]
})
export class CreateGameModule { }
