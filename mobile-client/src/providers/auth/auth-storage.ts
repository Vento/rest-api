import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthStorage {

  constructor(public events: Events, public storage: Storage) {
  }

  getAccessToken() {
    return this.storage.get('access_token');
  }

  setAccessToken(access_token) {
    this.storage.set('access_token', access_token);
  }

  getRefreshToken() {
    return this.storage.get('refresh_token').then((value) => {
      return value;
    });
  }

  setRefreshToken(refresh_token) {
    this.storage.set('refresh_token', refresh_token);
  }

  getTokenExpiration() {
    return this.storage.get('token_expiration').then((value) => {
      return value;
    });
  }

  setTokenExpiration(token_expiration) {
    let token_expiration_date = new Date (new Date().getTime() + (1000 * token_expiration));
    this.storage.set('token_expiration', token_expiration_date);
  }

}
