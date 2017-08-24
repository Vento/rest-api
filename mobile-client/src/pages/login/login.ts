import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Dashboard} from '../dashboard/dashboard';
import {Register} from '../register/register';
import {AuthService} from '../../providers/auth/auth-service';
import {AuthStorage} from '../../providers/auth/auth-storage';
import {ViewUtilities} from '../../providers/view-utilities/view-utilities';
import {ILogin} from "./LoginModel";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, AuthStorage]
})
export class Login {
  private login: ILogin  = <ILogin> {};
  private submitted = false;
  private backgroundHeight = document.body.clientHeight + 'px';

  constructor(public navCtrl: NavController,
              public viewUtilities: ViewUtilities,
              private authService: AuthService,
              private authStorage: AuthStorage) {
  }

  public ionViewWillEnter() {
    this.hasValidToken().then((hasToken) => {
      if (hasToken) {
        this.navCtrl.setRoot(Dashboard);  //Skip to Dashboard if user has a valid access token
      }
    });
  }

  private hasValidToken() {
    return this.authStorage.getTokenExpiration().then((tokenExpiration) => {
      let now = Date.now();
      return (tokenExpiration && (tokenExpiration.getTime() > now));
    });
  }

  private onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.viewUtilities.presentLoading();

      this.authService.requestToken(this.login).subscribe(
        authData => {
          console.log(authData);
          this.authStorage.setAccessToken(authData.access_token);
          this.authStorage.setRefreshToken(authData.refresh_token);
          this.authStorage.setTokenExpiration(authData.expires_in);
          this.viewUtilities.dismissLoading();
          this.navCtrl.setRoot(Dashboard);
        },
        err => {
          this.onError(err);
        }
      )
    }
  }

  private onRegister() {
    this.navCtrl.push(Register);
  }

  private onError(err) {
    this.viewUtilities.dismissLoading();
    this.viewUtilities.presentToast(<any>err);
  }


}
