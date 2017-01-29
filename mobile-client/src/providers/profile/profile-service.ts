import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
import { ApiBase } from '../api-base/api-base';
import { AuthStorage } from '../auth/auth-storage';
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

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let profileUri = this.apiUrl + "/" + profileId;
    
    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.get(profileUri, options)
        .map(res => res.json())
        .catch(this.handleError)    
      });
  } 

  getCurrentProfile() {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });
 
    let userInfoUri = this.apiUrl + "/current";
    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.get(userInfoUri, options)
        .map(res => res.json())
        .catch(this.handleError)    
      });  

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

    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.put(updateProfileUri, body, options)
        .map(res => res.json())
        .catch(this.handleError)    
      });  
  }

    createRoute(route) {

    let token = this.authStorage.getAccessToken();
    let createRoutesUri = this.apiUrl + "/current/routes";

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify(
      route
    );

    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.post(createRoutesUri, body, options)
        .map(res => res.json())
        .catch(this.handleError)    
      });  
    }
  
  createRecord(record) {

    let token = this.authStorage.getAccessToken();
    let createRecordUri = this.apiUrl + "/current/records";

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify(
      record
    );

    return Observable.fromPromise(this.authStorage.getAccessToken())
      .flatMap((token) => {
        headers.append('Authorization',`Bearer ${token}`)
        return this.http.post(createRecordUri, body, options)
        .map(res => res.json())
        .catch(this.handleError)    
      });
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
