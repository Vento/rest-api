import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Dashboard } from '../pages/dashboard/dashboard';
import { Page2 } from '../pages/page2/page2';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Routes } from '../pages/routes/routes';

import { ApiBase } from '../providers/api-base/api-base';
import { AuthService } from '../providers/auth-service/auth-service';
import { ProfileService } from '../providers/profile-service/profile-service';
import { MatchService } from '../providers/match-service/match-service';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    Page2,
    Login,
    Register,
    Routes
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Dashboard,
    Page2,
    Login,
    Register,
    Routes
  ],
  providers: [
    ApiBase,
    AuthService,
    ProfileService,
    MatchService
  ]
})
export class AppModule {}
