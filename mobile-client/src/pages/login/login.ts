import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { Register } from '../register/register';
import { AuthService } from '../../providers/auth/auth-service';
import { AuthStorage } from '../../providers/auth/auth-storage';
import { ProfileService } from '../../providers/profile/profile-service';
import { ProfileStorage } from '../../providers/profile/profile-storage';
import { ViewUtilities } from '../../providers/view-utilities/view-utilities';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, AuthStorage, ProfileService, ProfileStorage]
})
export class Login {
  login: {username?: string, password?: string} = {};
  submitted = false;
  backgroundHeight = document.body.clientHeight + 'px' ;

  constructor(public navCtrl: NavController, 
              public viewUtilities: ViewUtilities,
              private authService: AuthService, 
              private authStorage: AuthStorage, 
              private profileService: ProfileService,
              private profileStorage: ProfileStorage) {
  }

  ionViewWillEnter() {
      this.hasValidToken().then((hasToken) => {
      if (hasToken) this.navCtrl.setRoot(Dashboard); //Skip to Dashboard if user has a valid access token
    });  
  }
  
  hasValidToken(){
    return this.authStorage.getTokenExpiration().then((tokenExpiration) => {                               
      var now = Date.now();
      return (tokenExpiration.getTime() > now) ? true : false;
    });
  }
  
  onLogin(form) {
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
            err  => {
              this.onError(err);
            }
            
        )
    }
  }

onRegister() {
  this.navCtrl.push(Register);
}

onError(err) {
  this.viewUtilities.dismissLoading(); 
  this.viewUtilities.presentToast(<any>err);
}  


}
