import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class Account {

  username: string;

  constructor(public alertCtrl: AlertController, public nav: NavController) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  getUsername() {

  }
    
  changePassword() {
    let alert = this.alertCtrl.create({
      title: 'Change Password',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'password',
      placeholder: 'New password'
    });
    alert.addInput({
      name: 'password-repeat',
      placeholder: 'Repeat password'
    });     
    alert.addButton({
      text: 'Ok',
      handler: data => {
      }
    });

    alert.present();
  }

}
