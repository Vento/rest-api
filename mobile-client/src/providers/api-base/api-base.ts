import { Injectable } from '@angular/core';

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

  constructor() {
    this.apiBase = "http://snf-728774.vm.okeanos.grnet.gr/api";
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
