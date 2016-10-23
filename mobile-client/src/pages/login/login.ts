import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { Register } from '../register/register';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class Login {
  login: {username?: string, password?: string} = {};
  submitted = false;
  loader:any;
  backgroundHeight = document.body.clientHeight + 'px' ;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public toastCtrl: ToastController,
  public authService: AuthService) {
    this.loader = this.loadingCtrl.create({content: "Please wait..."}); 
  }
  onLogin(login) {
    this.submitted = true;

    //if (form.valid) {
      this.presentLoading();
      this.authService.login(this.login).subscribe(
            data => {          
              this.dismissLoading();     
              this.navCtrl.setRoot(Dashboard);
              console.log(data);
            },
            err  => {
              this.dismissLoading(); 
              this.presentToast(<any>err);

              // skip login development only
              this.navCtrl.setRoot(Dashboard);
            }
            
        )
    //}
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
