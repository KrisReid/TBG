import {Routes, RouterModule} from '@angular/router';

import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CreateGameComponent} from './create-game/create-game.component';
import {CreditDebitComponent} from './credit-debit/credit-debit.component';
import {GameViewComponent} from './game-view/game-view.component';
import {PlayComponent} from './play/play.component';
import {CreditDebitViewComponent} from './credit-debit-view/credit-debit-view.component';

import {LoggedInGuard} from './logged-in.guard';
import {UserAuthService} from './services/user-auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create', component: CreateGameComponent, canActivate: [LoggedInGuard] },
  { path: 'creditdebit', component: CreditDebitComponent, canActivate: [LoggedInGuard] },
  { path: 'gameview', component: GameViewComponent, canActivate: [LoggedInGuard]},
  { path: 'play', component: PlayComponent, canActivate: [LoggedInGuard] },
  { path: 'creditdebitview', component: CreditDebitViewComponent, canActivate: [LoggedInGuard] },
  { path: '', pathMatch: 'full', component: WelcomeComponent}
  // { path: '', redirectTo: 'login', pathMatch: 'full'}

];

export const routingProviders = [
  LoggedInGuard,
  UserAuthService
];

export const routingModule = RouterModule.forRoot(routes);
