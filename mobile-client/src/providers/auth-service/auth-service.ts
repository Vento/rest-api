import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ApiBase } from '../api-base/api-base';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  private apiUrl:string;
  providers: [ApiBase];

  constructor(public http: Http, public apiBase: ApiBase) {
    console.log('Initialized AuthService Provider');
    this.http = http;
    this.apiUrl = this.apiBase.getAuthApiUrl();
  }

  requestToken(request) {
    let accessTokenUri = this.apiUrl + "/oauth/token";

		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		let options = new RequestOptions({
			headers: headers
		});

		let body = JSON.stringify({
			username: request.username,
			password: request.password,
      grant_type: 'password'
		});
    
    return this.http.post(accessTokenUri, body, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
