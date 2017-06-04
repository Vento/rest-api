import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule  } from '@ionic/storage';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { MyApp } from './app.component';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { Shake } from '@ionic-native/shake';
import { Network } from '@ionic-native/network';

import { Dashboard } from '../pages/dashboard/dashboard';
import { History } from '../pages/history/history';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Statistics } from '../pages/statistics/statistics';
import { Routes } from '../pages/routes/routes';
import { RouteViewPage } from '../pages/route-view/route-view';
import { Matches, MatchPopoverPage } from '../pages/matches/matches';
import { Settings } from '../pages/settings/settings';
import { Account } from '../pages/account/account';

import { ApiBase } from '../providers/api-base/api-base';
import { AuthService } from '../providers/auth/auth-service';
import { ProfileService } from '../providers/profile/profile-service';
import { MatchService } from '../providers/match/match-service';

import { AuthStorage } from '../providers/auth/auth-storage';
import { ProfileStorage } from '../providers/profile/profile-storage';
import { SettingsStorage } from '../providers/settings/settings-storage';

import { ViewUtilities } from '../providers/view-utilities/view-utilities';

import { HttpInterceptor } from '../providers/http-interceptor/http-interceptor';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslationService } from '../providers/translation/translation-service';
import { ConnectivityService } from '../providers/connectivity-service';
import { LocationTrackerService } from '../providers/location-tracker-service';


import { GoogleMapComponent } from '../components/googlemaps/googlemaps-component';


export function httpInterceptor(backend: XHRBackend, options: RequestOptions, authService: AuthService, authStorage: AuthStorage) {
  return new HttpInterceptor(backend, options, authService, authStorage);
}

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
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
    RouteViewPage,
    Matches,
    MatchPopoverPage,
    Settings,
    Account,
    GoogleMapComponent
  ],
  imports: [
	BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top', 
      menuType: 'push'
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })  
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
    RouteViewPage,
    Matches,
    Settings,
    Account
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    Device,
    Shake,
    ApiBase,
    AuthService,
    ProfileService,
    MatchService,
    AuthStorage,
    ProfileStorage,
    SettingsStorage,
    ViewUtilities,
    TranslationService,
    ConnectivityService,
    LocationTrackerService,
    {
      provide: HttpInterceptor,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions, AuthService, AuthStorage]
    }
  ]
})
export class AppModule {}
