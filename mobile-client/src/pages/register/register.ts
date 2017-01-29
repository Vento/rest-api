import { Component } from '@angular/core';

import { ViewUtilities } from '../../providers/view-utilities/view-utilities';
import { NavController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { ProfileService } from '../../providers/profile/profile-service';
import { ProfileStorage } from '../../providers/profile/profile-storage';
import { AuthService } from '../../providers/auth/auth-service';
import { AuthStorage } from '../../providers/auth/auth-storage';
import { User } from './user.interface';

import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class Register {
  public user: User;
  submitted = false;
  
  constructor(public navCtrl: NavController,
              private viewUtilities: ViewUtilities,
              private profileService: ProfileService,
              private authService: AuthService,
              private profileStorage: ProfileStorage,
              private authStorage: AuthStorage) {
    this.user = {
      email: '',
      username: '',
      password: '',
      passwordRepeat: ''
    };
  }

  onRegister(form) {
    this.submitted = true;

    if (form.valid) {
      this.viewUtilities.presentLoading();
      this.profileService.createProfile(this.user).subscribe(
        profileData => {    
          
          this.viewUtilities.presentToast("Registration Success!");

              this.authService.requestToken(this.user).subscribe(
                    authData => {          
                      this.authStorage.setAccessToken(authData.access_token);
                      this.authStorage.setRefreshToken(authData.refresh_token);
                      this.authStorage.setTokenExpiration(authData.expires_in);                      
                      this.profileStorage.setProfile(profileData);

                      console.log(authData);
                      console.log(profileData);
                      this.viewUtilities.dismissLoading();     
                      this.navCtrl.setRoot(Dashboard);
                    },
                    err  => {
                      this.onError(<any>err);
                    }
                    
                )
            },
            err  => {
              this.onError(<any>err);
            }
            
        )
    }
  }

onError(err) {
  this.viewUtilities.dismissLoading(); 
  this.viewUtilities.presentToast(<any>err);
} 

}
