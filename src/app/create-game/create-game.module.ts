import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CreateGameComponent } from './create-game.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [CreateGameComponent],
})
export class CreateGameModule { }
