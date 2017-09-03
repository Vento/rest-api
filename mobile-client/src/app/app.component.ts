import {Component, ViewChild} from '@angular/core';
import {Events, MenuController, Nav, Platform} from 'ionic-angular';
import {Splashscreen, StatusBar} from 'ionic-native';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/Observable';

import {Dashboard} from '../pages/dashboard/dashboard';
import {History} from '../pages/history/history';
import {Login} from '../pages/login/login';
import {Statistics} from '../pages/statistics/statistics';
import {Routes} from '../pages/routes/routes';
import {Matches} from '../pages/matches/matches';
import {Settings} from '../pages/settings/settings';
import {Account} from '../pages/account/account';
import {ConnectivityService} from '../providers/connectivity-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;
  activePage: any = Login;

  appPages: Array<{ title: string, component: any, icon?: string, logsOut?: boolean, index?: number; }>;
  accountPages: Array<{ title: string, component: any, icon?: string, logsOut?: boolean, index?: number; }>;

  constructor(public events: Events,
              public menu: MenuController,
              public platform: Platform,
              public storage: Storage,
              public connectivityService: ConnectivityService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.appPages = [
      {title: 'Activity', component: Dashboard, icon: 'fi flaticon-man-running'},
      {title: 'History', component: History, icon: 'fi flaticon-history'},
      {title: 'Statistics', component: Statistics, icon: 'fi flaticon-cardiogram-and-heart'},
      {title: 'Routes', component: Routes, icon: 'fi flaticon-route-1'},
      {title: 'Matches', component: Matches, icon: 'fi flaticon-marathon'}
    ];

    this.accountPages = [
      {title: 'Settings', component: Settings, icon: 'fi flaticon-settings-gears'},
      {title: 'Account', component: Account, icon: 'fi flaticon-people'},
      {title: 'Logout', component: Login, icon: 'fi flaticon-logout', logsOut: true}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.addConnectivityListeners();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.logsOut) this.logout().then(data => {
      this.nav.setRoot(page.component);
    });
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  logout() {
    return Promise.all([
      Observable.fromPromise(this.storage.remove('profile')),
      Observable.fromPromise(this.storage.remove('access_token')),
      Observable.fromPromise(this.storage.remove('refresh_token')),
      Observable.fromPromise(this.storage.remove('token_expiration'))

    ]);
  }

  onMenuToggle(event) {
    (this.menu.isOpen()) ? this.events.publish('sidebar:open') : this.events.publish('sidebar:close');
  }

  addConnectivityListeners() {
    this.connectivityService.addConnectivityListeners();
  }

  isPageActive(page): boolean {
    return (page.title === this.activePage.title);
  }
}
