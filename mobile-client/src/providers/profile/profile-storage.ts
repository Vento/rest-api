import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ProfileStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileStorage {

  constructor(public events: Events, public storage: Storage) {
  }

  getProfile() {
    return this.storage.get('profile').then((value) => {
      return value;
    });
  }

  setProfile(profile) {
    this.storage.set('profile', profile);
  }
}
