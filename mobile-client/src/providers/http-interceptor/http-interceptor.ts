import { Injectable } from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../auth/auth-service';
import { AuthStorage } from '../auth/auth-storage';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpInterceptor extends Http {
    
    constructor(backend: XHRBackend, defaultOptions: RequestOptions, private authService: AuthService, private authStorage: AuthStorage) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
    }
 
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url,this.getRequestOptionArgs(options)));
    }
 
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {  
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }
 
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }
 
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }
    
    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        /*options.headers.append('Content-Type', 'application/json');
        if (options.headers.has("Authorization")) {
            if (!this.authService.isAuthenticated) {
                console.log("Intercepted call");
                this.authService.authenticate();
            } else {
                console.log("Intercepted call 2");
                let token = this.authStorage.getAccessToken().then(token => {
                    options.headers.delete('Authorization');
                    options.headers.append('Authorization', "Bearer " + token);
                    return options;
                });
            }
        } else {
            
        }*/

        
        return options;
    }
 
    intercept(observable: Observable<Response>): Observable<Response> {
        console.log("intecept");
        return observable.catch((err, source) => {
            if (err.status  == 401) {
                console.log("401");
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
 
    }


}
