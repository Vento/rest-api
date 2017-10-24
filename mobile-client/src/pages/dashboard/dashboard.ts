import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ViewUtilities} from '../../providers/view-utilities/view-utilities';
import {ProfileService} from '../../providers/profile/profile-service';
import {ProfileStorage} from '../../providers/profile/profile-storage';
import {TranslationService} from '../../providers/translation/translation-service';
import * as moment from 'moment';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  dashboard: { name?: string, lastSeen?: string, routes?: any, records?: any } = {};

  constructor(public navCtrl: NavController, public viewUtilities: ViewUtilities, private profileService: ProfileService,
              private profileStorage: ProfileStorage, public translationService: TranslationService) {
  }


  ionViewWillEnter() {
    this.loadDashboard();
  }

  doRefresh(refresher) {
    this.loadDashboard();
    setTimeout(() => {
      refresher.complete();
    }, 2000);

  }

  private loadDashboard() {
    this.profileService.getCurrentProfile().subscribe((profileData) => {
        this.profileStorage.setProfile(profileData);
        this.dashboard.name = profileData.name;
        this.dashboard.lastSeen = this.lastLoginDuration(profileData.lastSeen);
        this.dashboard.routes = profileData.routes;
        this.dashboard.records = profileData.records;
      },
      err => {
        this.viewUtilities.onError(err);
      }
    );

    this.translationService.loadLanguagePreferences();
  }

  private lastLoginDuration(loginTime) {
    let now = moment(new Date());
    let end = moment(loginTime);
    let duration = moment.duration(now.diff(end));
    return duration.humanize();
  }
}
