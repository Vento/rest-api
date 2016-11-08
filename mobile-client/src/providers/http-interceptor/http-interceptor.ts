import { Injectable } from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../auth-service/auth-service';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: XHRBackend, defaultOptions: RequestOptions, private authService: AuthService) {
        super(backend, defaultOptions);
    }

    private beforeIntercept(options?: RequestOptionsArgs) {
      if(options.headers.get('Authorization') && !this.authService.isAuthenticated){
        this.authService.authenticate();
      }
    }
    
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        this.beforeIntercept(options);
        return this.intercept(super.request(url, options));
    }
 
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.beforeIntercept(options);
        return this.intercept(super.get(url,options));
    }
 
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {  
        this.beforeIntercept(options);
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }
 
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        this.beforeIntercept(options);
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }
 
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        this.beforeIntercept(options);
        return this.intercept(super.delete(url, options));
    }
    
    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        /*if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        */
        return options;
    }
 
    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status  == 401 && !this.authService.isAuthenticated) {
                this.authService.authenticate();
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
 
    }


}
