import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SettingsModel } from '../../models/settings-model';
import { SettingsStorage } from '../../providers/settings/settings-storage';
import { ViewUtilities } from '../../providers/view-utilities/view-utilities';
import { TranslationService } from '../../providers/translation/translation-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [SettingsModel]
})
export class Settings {

  constructor(public navCtrl: NavController, public viewUtilities: ViewUtilities, public translationService: TranslationService,
    public settingsModel: SettingsModel, public settingsStorage: SettingsStorage) {

    this.settingsModel = new SettingsModel();
  }

  ionViewWillEnter() {
    this.settingsStorage.getSettings().subscribe(data => {
      this.settingsModel.selectedLanguage = data[0];
      this.settingsModel.pushNotifications = data[1];
      this.translationService.loadLanguagePreferences();
    });
  }

  saveLanguageOption(selectedItem) {
    this.settingsStorage.setLanguage(selectedItem);
    this.navCtrl.push(Settings);
  }

  savePushNotificationsOption(selectedItem) {
    this.settingsStorage.setPushNotifications(selectedItem);
  }
}
