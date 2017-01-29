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
          Observable.fromPromise(this.getNativeMaps())
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

  getNativeMaps() {
    return this.storage.get('settings.nativemaps').then((value) => {
      return value;
    });
  }

  setNativeMaps(option) {
    this.storage.set('settings.nativemaps', option);
  }  
}
