import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {LoginModule} from './login/login.module';
import {SignupModule} from './signup/signup.module';
import {CreditDebitModule} from './credit-debit/credit-debit.module';
import {CreateGameModule} from './create-game/create-game.module';
import {GameViewModule} from './game-view/game-view.module';
import {PlayModule} from './play/play.module';
import {CreditDebitViewModule} from './credit-debit-view/credit-debit-view.module';

import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';

import {routingModule} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    SignupModule,
    CreditDebitModule,
    CreateGameModule,
    GameViewModule,
    PlayModule,
    CreditDebitViewModule,
    routingModule
  ],
  providers: [
    PlayerService,
    GameService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
