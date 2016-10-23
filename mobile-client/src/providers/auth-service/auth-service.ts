import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/Observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ApiGlobals } from '../api-globals/api-globals';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  private data:any;
  private body:any;
  private apiUrl:string;
  providers: [ApiGlobals];

  constructor(public http: Http, public apiGlobals: ApiGlobals) {
    console.log('Initialized AuthService Provider');
    this.http = http;
    this.apiUrl = this.apiGlobals.getAuthApiUrl();
  }

  login(body) {
    return this.http.post(this.apiUrl, this.body)
      .map(res => res.json())
      .catch(this.handleError)
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
