import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiGlobals provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiGlobals {
  private apiBase:string;
  private profileApi:string;
  private matchApi:string;
  private authApi:string;

  constructor(public http: Http) {
    this.apiBase = "http://localhost:9000/api";
    this.profileApi = this.apiBase + "/v1/users/";
    this.matchApi = this.apiBase + "/v1/matches/";
    this.authApi = this.apiBase + "/v1/uaa/";
  }

  getApiBaseUrl() {
    return this.apiBase;
  }

  getProfileApiUrl() {
    return this.profileApi;
  }

  getMatchApiUrl() {
    return this.matchApi;
  }

  getAuthApiUrl() {
    return this.authApi;
  }

}
