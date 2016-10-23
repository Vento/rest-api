import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Dashboard } from '../pages/dashboard/dashboard';
import { Page2 } from '../pages/page2/page2';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Routes } from '../pages/routes/routes';

import { ApiGlobals } from '../providers/api-globals/api-globals';
import { AuthService } from '../providers/auth-service/auth-service';

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
    ApiGlobals,
    AuthService
  ]
})
export class AppModule {}
