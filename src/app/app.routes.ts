import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
// import {CreateGameComponent} from './create-game/create-game.component';
// import {CreditDebitComponent} from './credit-debit/credit-debit.component';
// import {GameViewComponent} from './game-view/game-view.component';
// import {PlayComponent} from './play/play.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'create', component: CreateGameComponent},
  // { path: 'creditdebit', component: CreditDebitComponent},
  // { path: 'games', component: GameViewComponent},
  // { path: 'play', component: PlayComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'}

];

export const routingModule = RouterModule.forRoot(routes);
