import {Component} from '@angular/core';

import {AlertController, NavController} from 'ionic-angular';
import {ProfileStorage} from "../../providers/profile/profile-storage";
import {IProfile} from "../../models/ProfileModel";
import {IGender} from "./IGender";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class Account {

  private userProfile: IProfile;
  private genders: IGender[] = [IGender.MALE, IGender.FEMALE] ;

  constructor(public alertCtrl: AlertController, public nav: NavController, private profileStorage: ProfileStorage) {}

  public ionViewWillEnter() {
    this.profileStorage.getProfile().then((profile: IProfile) => {
      this.userProfile = profile;
    })
  }


  private saveGender(gender: string): void {
    this.userProfile.gender = gender;
  }

  private changePassword(): void {
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
