import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { Dashboard } from '../pages/dashboard/dashboard';
import { History } from '../pages/history/history';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Statistics } from '../pages/statistics/statistics';
import { Routes } from '../pages/routes/routes';
import { Matches } from '../pages/matches/matches';
import { Settings } from '../pages/settings/settings';
import { Account } from '../pages/account/account';

import { ApiBase } from '../providers/api-base/api-base';
import { AuthService } from '../providers/auth-service/auth-service';
import { ProfileService } from '../providers/profile-service/profile-service';
import { MatchService } from '../providers/match-service/match-service';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    History,
    Login,
    Register,
    Statistics,
    Routes,
    Matches,
    Settings,
    Account
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Dashboard,
    History,
    Login,
    Register,
    Statistics,
    Routes,
    Matches,
    Settings,
    Account
  ],
  providers: [
    ApiBase,
    AuthService,
    ProfileService,
    MatchService,
    Storage
  ]
})
export class AppModule {}
