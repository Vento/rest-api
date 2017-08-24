import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {ApiBase} from '../api-base/api-base';
import * as io from 'socket.io-client';
import {AuthStorage} from '../auth/auth-storage';

/*
  Generated class for the MatchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MatchService extends ApiBase {
  private apiUrl: string;
  private socket;

  constructor(public http: Http, public authStorage: AuthStorage) {
    super();
    this.apiUrl = this.getMatchApiUrl();
  }


  public getLocationByUsername(username:string) {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });

    let locationUri = this.apiUrl + "/location/" + username;

    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.get(locationUri, options)
          .map(res => res.json())
          .catch(MatchService.handleError)
      });
  }

  public getCurrentLocation() {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });

    let locationUri = `${this.apiUrl}"/location/me`;

    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.get(locationUri, options)
          .map(res => res.json())
          .catch(MatchService.handleError)
      });
  }

  public getLocationAroundByUsername(username:string) {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });

    let locationUri = this.apiUrl + "/around/" + username;

    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.get(locationUri, options)
          .map(res => res.json())
          .catch(MatchService.handleError)
      });
  }

  public getLocationAroundCurrentUser() {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
    });

    let locationUri = `${this.apiUrl}"/around/me`;

    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.get(locationUri, options)
          .map(res => res.json())
          .catch(MatchService.handleError)
      });
  }

  public sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  public getMessages() {
    return new Observable(observer => {
      this.socket = io(this.apiUrl);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  private static handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
