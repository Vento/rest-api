import { Component } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { ProfileService } from '../../providers/profile-service/profile-service';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ProfileStorage } from '../../providers/profile-storage/profile-storage';
import { AuthStorage } from '../../providers/auth-storage/auth-storage';
import { User } from './user.interface';

import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class Register {
  public user: User;
  submitted = false;
  loader: any;
  
  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private profileService: ProfileService,
              private authService: AuthService,
              private profileStorage: ProfileStorage,
              private authStorage: AuthStorage) {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." }); 
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
      this.presentLoading();
      this.profileService.createProfile(this.user).subscribe(
        profileData => {    
          
          this.presentToast("Registration Success!");

              this.authService.requestToken(this.user).subscribe(
                    authData => {          
                      this.authStorage.setAccessToken(authData.access_token);
                      this.authStorage.setRefreshToken(authData.refresh_token);
                      this.authStorage.setTokenExpiration(authData.expires_in);                      
                      this.profileStorage.setProfile(profileData);

                      console.log(authData);
                      console.log(profileData);
                      this.dismissLoading();     
                      this.navCtrl.setRoot(Dashboard);
                    },
                    err  => {
                      this.dismissLoading(); 
                      this.presentToast(<any>err);
                    }
                    
                )
            },
            err  => {
              this.dismissLoading(); 
              this.presentToast(<any>err);
            }
            
        )

    }
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading(){
      this.loader.dismissAll();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
