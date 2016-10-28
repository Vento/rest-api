import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiBase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiBase {
  private apiBase:string;
  private profileApi:string;
  private matchApi:string;
  private authApi:string;

  constructor(public http: Http) {
    this.apiBase = "http://localhost:9000/api";
    this.profileApi = this.apiBase + "/profiles";
    this.matchApi = this.apiBase + "/matches";
    this.authApi = this.apiBase + "/uaa";
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
