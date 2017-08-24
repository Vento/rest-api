import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ApiBase } from '../api-base/api-base';
import { AuthStorage } from '../auth/auth-storage';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService extends ApiBase {
  private apiUrl:string;
  providers: [AuthStorage];

  constructor(public http: Http, public authStorage: AuthStorage) {
    super();
    this.apiUrl = this.getAuthApiUrl();
  }

  requestToken(credientials) {
    let accessTokenUri = this.apiUrl + "/oauth/token";
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic bW9iaWxlYXBwOnNlY3JldA=='
		});

		let options = new RequestOptions({
			headers: headers
		});

    let body = "username=" + credientials.username + "&password=" + credientials.password + "&grant_type=password";

    return this.http.post(accessTokenUri, body, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

    refreshAccessToken() {
      let token = this.authStorage.getRefreshToken();
      let accessTokenUri = this.apiUrl + "/oauth/token";
      let headers = new Headers({
        'Content-Type': 'application/json',
      });

      let options = new RequestOptions({
        headers: headers
      });

      let body = JSON.stringify({});

      return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.post(accessTokenUri, body, options)
        .map(res => res.json())
        .catch(this.handleError)
      });
  }

  isAuthenticated() {
      let tokenExpiration = this.authStorage.getTokenExpiration();
      return (Number(tokenExpiration) < new Date().getTime());
  }

  authenticate(){
    if(this.isAuthenticated() == false && this.authStorage.getRefreshToken() !== null){
      let response = JSON.parse(JSON.stringify(this.refreshAccessToken()));
      this.authStorage.setRefreshToken(response.refresh_token);
      this.authStorage.setTokenExpiration(response.expires_in);
      return true;
    }
    return false;

  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
