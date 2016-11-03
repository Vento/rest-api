import { Component } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { ProfileService } from '../../providers/profile-service/profile-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ProfileService]
})
export class Register {
  register: {email?: string, username?: string, password?: string, passwordRepeat?: string} = {};
  submitted = false;
  loader:any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public toastCtrl: ToastController,
  public profileService: ProfileService) {
    this.loader = this.loadingCtrl.create({content: "Please wait..."}); 
  }

  onRegister(form) {
    this.submitted = true;

    if (form.valid) {
      this.presentLoading();
      this.profileService.createProfile(this.register).subscribe(
            data => {          
              this.dismissLoading();     
              this.navCtrl.setRoot(Dashboard);
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
