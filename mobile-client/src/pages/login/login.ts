import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { Register } from '../register/register';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ProfileService } from '../../providers/profile-service/profile-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, ProfileService]
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
              public profileService: ProfileService) {
    this.loader = this.loadingCtrl.create({content: "Please wait..."}); 
  }
  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.presentLoading();
      this.authService.requestToken(this.login).subscribe(
            data => {          
              let token = data.access_token;
              console.log(data.access_token);
              console.log(data.refresh_token);

              this.profileService.getCurrentProfile(token).subscribe(
                    data => {          
                      this.dismissLoading();     
                      this.navCtrl.setRoot(Dashboard);
                      let profileData = data;
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
