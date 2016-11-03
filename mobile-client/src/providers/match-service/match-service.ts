import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/Observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ApiBase } from '../api-base/api-base';

/*
  Generated class for the MatchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MatchService {
  private apiUrl:string;
  providers: [ApiBase];

  constructor(public http: Http, public apiBase: ApiBase) {
    console.log('Initialized MatchService Provider');
    this.http = http;
    this.apiUrl = this.apiBase.getMatchApiUrl();
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
