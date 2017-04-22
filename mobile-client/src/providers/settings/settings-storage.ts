import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the ProfileStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsStorage {

  constructor(public events: Events, public storage: Storage) {
    console.log('Hello SettingsStorage Provider');
  }


  getSettings() {
      return Observable.forkJoin([
          Observable.fromPromise(this.getLanguage()),
          Observable.fromPromise(this.getPushNotifications())
      ]);
  }
    
  getLanguage() {
    return this.storage.get('settings.language').then((value) => {
      return value;
    });
  }

  setLanguage(option) {
    this.storage.set('settings.language', option);
  }
  
  getPushNotifications() {
    return this.storage.get('settings.pushnotifications').then((value) => {
      return value;
    });    
  }

  setPushNotifications(option) {
    this.storage.set('settings.pushnotifications', option);
  }
}
