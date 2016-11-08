import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { ApiBase } from '../api-base/api-base';

/*
  Generated class for the MatchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MatchService extends ApiBase{
  private apiUrl:string;

  constructor(public http: Http ) {
    super();
    console.log('Initialized MatchService Provider');
    this.apiUrl = this.getMatchApiUrl();
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
