import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class Register {
  register: {email?: string, username?: string, password?: string, passwordRepeat?: string} = {};
  constructor(public navCtrl: NavController) {
    
  }

}
