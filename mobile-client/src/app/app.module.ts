import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';

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

import { AuthStorage } from '../providers/auth-storage/auth-storage';
import { ProfileStorage } from '../providers/profile-storage/profile-storage';

import { HttpInterceptor } from '../providers/http-interceptor/http-interceptor';

export function httpInterceptor(backend: XHRBackend, options: RequestOptions, authService: AuthService) {
  return new HttpInterceptor(backend, options, authService);
}

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
    AuthStorage,
    ProfileStorage,
    Storage,
    {
      provide: HttpInterceptor,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions, AuthService]
    }
  ]
})
export class AppModule {}
