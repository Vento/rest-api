import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { Register } from '../register/register';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ProfileService } from '../../providers/profile-service/profile-service';
import { ProfileStorage } from '../../providers/profile-storage/profile-storage';
import { AuthStorage } from '../../providers/auth-storage/auth-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, AuthStorage, ProfileService, ProfileStorage]
})
export class Login {
  login: {username?: string, password?: string} = {};
  submitted = false;
  loader:any;
  backgroundHeight = document.body.clientHeight + 'px' ;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public authService: AuthService, 
              public authStorage: AuthStorage, 
              public profileService: ProfileService,
              public profileStorage: ProfileStorage) {
    this.loader = this.loadingCtrl.create({content: "Please wait..."}); 
  }
  
  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.presentLoading();  
      
      this.authService.requestToken(this.login).subscribe(
            authData => {          
              console.log(authData);
              this.authStorage.setAccessToken(authData.access_token);
              this.authStorage.setRefreshToken(authData.refresh_token);
              this.authStorage.setTokenExpiration(authData.expires_in);
              console.log(authData.access_token);

              this.profileService.getCurrentProfile().subscribe(
                    profileData => {          
                      this.dismissLoading();     
                      this.navCtrl.setRoot(Dashboard);
                      this.profileStorage.setProfile(profileData);
                      console.log(profileData);
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

  onRegister() {
    this.navCtrl.push(Register);
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
