import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/Observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ApiBase } from '../api-base/api-base';

/*
  Generated class for the ProfileService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileService {

  private apiUrl:string;
  providers: [ApiBase];

  constructor(public http: Http, public apiBase: ApiBase) {
    console.log('Initialized ProfileService Provider');
    this.http = http;
    this.apiUrl = this.apiBase.getProfileApiUrl();
  }

  getProfile(profileId:string, token:string) {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    let options = new RequestOptions({
      headers: headers
    });

    let profileUri = this.apiUrl + "/profiles/" + profileId;
    return this.http.get(profileUri, options)
      .map(res => res.json())
      .catch(this.handleError)
  } 

  getCurrentProfile(token:string) {

      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
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

  updateProfile(updatedProfile, token:string) {

    let updateProfileUri = this.apiUrl + "/current";

		let headers = new Headers({
			'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
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
