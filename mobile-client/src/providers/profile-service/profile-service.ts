import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { ApiBase } from '../api-base/api-base';
import { AuthStorage } from '../auth-storage/auth-storage';
import { HttpInterceptor } from '../http-interceptor/http-interceptor';

/*
  Generated class for the ProfileService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileService extends ApiBase {

  private apiUrl:string;
  providers: [AuthStorage];

  constructor(public http: HttpInterceptor, public authStorage: AuthStorage) {
    super();
    console.log('Initialized ProfileService Provider');
    this.apiUrl = this.getProfileApiUrl();
  }

  getProfile(profileId:string) {

    let token = this.authStorage.getAccessToken();
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let options = new RequestOptions({
      headers: headers
    });

    let profileUri = this.apiUrl + "/profiles/" + profileId;
    return this.http.get(profileUri, options)
      .map(res => res.json())
      .catch(this.handleError)
  } 

  getCurrentProfile() {

    let token = this.authStorage.getAccessToken();
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let options = new RequestOptions({
      headers: headers
    });

    let userInfoUri = this.apiUrl + "/profiles/current";
    return this.http.get(userInfoUri, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  createProfile(request) {

    let createProfileUri = this.apiUrl + "/";

		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		let options = new RequestOptions({
			headers: headers
		});
    
		let body = JSON.stringify({
      email: request.email,
			username: request.username,
			password: request.password,
		});

    return this.http.post(createProfileUri, body, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  updateProfile(updatedProfile) {

    let token = this.authStorage.getAccessToken();
    let updateProfileUri = this.apiUrl + "/current";

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify(
      updatedProfile
    );

    return this.http.put(updateProfileUri, body, options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
